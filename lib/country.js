export const getAllCountryNames = async () => {
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

  let data = [];

  for (let i = 0; i < namesToFilter.length; i++) {
    data.push({ name: namesToFilter[i].replace(/[' ']/gim, "-") });
  }
  return data;
};

export const getCountryData = async (name) => {
  const response = await fetch(`https://restcountries.com/v3.1/name/${name.replace(/-/g, '%20')}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  let result = await response.json();
  return {
    params: {
      result,
    },
  };
};
