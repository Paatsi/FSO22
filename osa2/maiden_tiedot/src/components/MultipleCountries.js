const MultipleCountries = ({ countriesToShow, setNewFilter }) => {
    
    const handleClick = (name) => {
        setNewFilter(name)
    }

    return (
        countriesToShow.map(country =>
            <p key={country.area}> {country.name.common}
                <button onClick={() => handleClick(country.name.common)}>show</button>
            </p>
        )
    )
}

export default MultipleCountries