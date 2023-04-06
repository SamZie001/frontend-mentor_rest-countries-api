import countryStyles from "../styles/CountryDetails.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const CountryDetails = ({ country }) => {
  const natives = Object.entries(country.name.nativeName);
  let nativeName = natives[natives.length - 1][1].official;

  const language = Object.entries(country.languages).map((array) => array[1]);
  const [borders, setBorders] = useState(null);

  const fetchBorders = async (borderArray) => {
    if (borderArray !== undefined) {
      const borderNames = [];
      for (let i = 0; i < borderArray.length; i++) {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${borderArray[i]}`
        );
        const result = await response.json();
        borderNames.push(result[0].name.common);
      }
      setBorders(borderNames);
    } else {
      return;
    }
  };
  fetchBorders(country.borders);

  return (
    <main className="container">
      <Link href="/" className={`${countryStyles.back} btn`}>
        &#8592; Back
      </Link>

      <div className={countryStyles["country-detail"]}>
        <div className={countryStyles.flag}>
          <Image src={country.flags.svg} alt="flag" width={100} height={100} />
        </div>
        <div className={countryStyles.detail}>
          <h1>{country.name.common}</h1>
          <div className={countryStyles["country-data"]}>
            <div>
              <p>
                <strong>Native Name:</strong> {nativeName}
              </p>
              <p>
                <strong>Population:</strong> {country.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Sub Region:</strong> {country.subregion}
              </p>
              <p>
                <strong>Capital:</strong> {country.capital[0]}
              </p>
            </div>
            <div>
              <p>
                <strong>Top Level Domain:&nbsp;</strong>
                {country.tld && country.tld[0]}
                {!country.tld && "None"}
              </p>
              <p>
                <strong>Currencies:</strong>{" "}
                {Object.entries(country.currencies)[0][1].name}
              </p>
              <p>
                <strong>Languages:</strong>{" "}
                {language.map((e) =>
                  language.indexOf(e) === language.length - 1
                    ? ` ${e}`
                    : `${e} ,`
                )}
              </p>
            </div>
          </div>

          <div className={countryStyles.borders}>
            <strong>Border countries:</strong>
            <div className={countryStyles["border-list"]}>
              {country.borders &&
                borders &&
                borders.map((e, index) => <p key={index}>{e}</p>)}
              {!country.borders && <p>None</p>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CountryDetails;
