import OneCountry from "./OneCountry"
import MultipleCountries from "./MultipleCountries"

const Countries = ({ countries, filtered, newFilter, setNewFilter }) => {

    const countriesToShow = filtered
        ? countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
        : countries

    if (countriesToShow.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else if (countriesToShow.length === 1) {
        const country = countriesToShow[0]
        return (
            <OneCountry country={country} />
        )
    }
    else {
        return (
            <MultipleCountries countriesToShow={countriesToShow} 
            setNewFilter={setNewFilter}/>
        )
    }
}

export default Countries