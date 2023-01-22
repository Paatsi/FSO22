import { useEffect, useState } from 'react'
import axios from "axios"
import Weather from './Weather'


const OneCountry = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const api_key = process.env.REACT_APP_API_KEY
    const items = Object.values(country.languages)
    
    useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
    .then(response => {
        console.log(response.data);
        setWeather(response.data)
    })
}, [])

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <b>languages:</b>
            <ul>
                {items.map(lang =>
                    <li key={lang}> {lang} </li>)
                }
            </ul>
            <img xmlns="http://www.w3.org/2000/svg" src={country.flags.svg} alt=""
                width="10%" height="5%" />
            <h3>Weather in {country.capital}</h3>
            <Weather weather={weather} />
        </div>
    )
}

export default OneCountry