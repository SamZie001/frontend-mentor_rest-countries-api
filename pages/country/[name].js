import Layout from "../../components/layout";
import Meta from "../../components/Meta";
import { getAllCountryNames, getCountryData } from "../../lib/country";
import CountryDetails from "../../components/CountryDetails";
getCountryData('united-states')
// Stores all possible paths and creates template for them at build time
export const getStaticPaths = async () => {
  const data = await getAllCountryNames();

  const paths = data.map((country) => {
    return {
      params: {
        name: country.name,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

// This will get the data for each of the stored pages and return that data as props to be used in the DOM
export const getStaticProps = async ({ params }) => {
  const name = params.name;
  const countryData = await getCountryData(name.replace(/-/g, '%20'));

  return {
    props: {
      countryData: { ...countryData.params.result[0] },
    },
  };
};

const Country = ({ countryData }) => {
  return (
    <Layout>
      <Meta />
      <CountryDetails country={countryData} />
    </Layout>
  );
};

export default Country;
