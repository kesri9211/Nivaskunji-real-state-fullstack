import countries from "world-countries";

const formattedCountries = countries.map((country)=> ({
    value: country.name.common, //name
    label: `${country.name.common} ${country.flag}`, //flag
    latlng: country.latlng, //latitude and longitude to render on map
    region: country.region
}))

const useCountries = ()=> {
    const getAll = ()=> formattedCountries;
    return {getAll}
}

export default useCountries