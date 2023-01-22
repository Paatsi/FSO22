const Weather = ({ weather }) => {
    if (weather === null) {
        return
    }
    return (
        <div>
            <p>temperature {weather.main.temp} Celcius</p>
            <img src={(`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)} alt=""></img>
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather