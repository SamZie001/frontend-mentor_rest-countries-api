import Layout from "../components/layout";
import Meta from "../components/Meta";
import homeStyles from "../styles/Home.module.css";
import Image from "next/image";
import { useEffect, useState} from "react";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function Home() {
  const [searchKey, setSearchKey] = useState(null);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filterOption, setFilterOption] = useState(null);
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);

  let { data, error, isLoading } = useSWR("api/staticdata", fetcher);

  useEffect(()=> {
    if (data) {
      data = JSON.parse(data);
  
      const namesToFilter = [
        "Germany",
        "United States of America",
        "Brazil",
        "Iceland",
        "Afghanistan",
        "Nigeria",
        "Albania",
        "Fiji",
      ];
      setCountries(
        data.filter((country) =>
          namesToFilter.some((name) =>
            country.name.toLowerCase().includes(name.toLowerCase())
          )
        )
      );
  
      setFilteredCountries(
        data.filter((country) =>
          namesToFilter.some((name) =>
            country.name.toLowerCase().includes(name.toLowerCase())
          )
        )
      );
    }
  },[data])

  const handleSearch = () => {
    if (searchKey) {
      setIsLoading(true);
      setFilteredCountries(
        countries.filter((e) => e.name.toLowerCase().includes(searchKey))
      );
      setIsLoading(false);
    }
  };

  const handleFilter = (filterKey) => {
    if (!filterKey) {
      setFilteredCountries(countries);
    } else {
      setFilterOption(filterKey);
      setFilteredCountries(
        countries.filter((e) =>
          e.region.toLowerCase().includes(filterKey.toLowerCase())
        )
      );
    }
  };

  return (
    <Layout>
      <Meta />
      <main className="container">
        <div className={homeStyles["search-and-filter"]}>
          <div className={homeStyles.search}>
            <button onClick={handleSearch}><i className="fa-solid fa-magnifying-glass"></i></button>
            <input
              type="text"
              placeholder="Search for a country..."
              onChange={(e) => {
                if (e.target.value) {
                  setSearchKey(e.target.value.toLowerCase());
                }
                if (!e.target.value) {
                  setFilteredCountries(countries);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>

          <div
            onClick={() => setShowFilterOptions((prev) => !prev)}
            className={homeStyles.filter}
          >
            <p>
              {filterOption === null ? "Filter by Region" : filterOption}<i className="fa-solid fa-caret-down"></i>
            </p>
            {showFilterOptions && (
              <ul className={homeStyles["slide-in-blurred-top"]}>
                <li onClick={() => handleFilter()}>Clear Filter</li>
                <li onClick={() => handleFilter("Africa")}>Africa</li>
                <li onClick={() => handleFilter("America")}>America</li>
                <li onClick={() => handleFilter("Asia")}>Asia</li>
                <li onClick={() => handleFilter("Europe")}>Europe</li>
                <li onClick={() => handleFilter("Oceania")}>Oceania</li>
              </ul>
            )}
          </div>
        </div>

        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className={homeStyles.countries}>
          {!isLoading &&
            filteredCountries &&
            filteredCountries.map((country, index) => (
              <Link
                className={homeStyles.country}
                key={index}
                href={`/country/${country.name.replace(/[' ']/gim, "-")}`}
              >
                <div className={homeStyles.flag}>
                  <Image
                    src={country.flag}
                    alt="flag"
                    width={100}
                    height={100}
                  />
                </div>
                <div className={homeStyles["country-details"]}>
                  <h3>{country.name}</h3>
                  <>
                    <p>
                      <span>Population: </span>
                      {country.population.toLocaleString()}
                    </p>
                    <p>
                      <span>Region: </span>
                      {country.region}
                    </p>
                    <p>
                      <span>Capital: </span>
                      {country.capital}
                    </p>
                  </>
                </div>
              </Link>
            ))}
        </div>
      </main>
    </Layout>
  );
}
