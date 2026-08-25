const Country = ({ country, onShow, weather }) => {
    if (country.length === 0) {
        return <p>No countries found</p>
    }

    if (country.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
    
    if (country.length > 1) {
        return (
            <div>
                {country.map((c) => (
                    <p key={c.name.common}>
                        {c.name.common}
                        <button onClick={() => onShow(c)}>show</button>
                    </p>
                ))}

            </div>
        )
    }

    return (
        <div>
            <h2>{country[0].name.common}</h2>
            <p>capital {country[0].capital}</p>
            <p>area {country[0].area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.values(country[0].languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country[0].flags.png} alt={`Flag of ${country[0].name.common}`} />
            
            <h2> Weather in {country[0].capital}</h2>
            <p>Temperature: {weather ? `${weather.current.temperature_2m} °C` : 'Loading...'}</p>
            <p>Wind {weather ? `${weather.current.wind_speed_10m} Km/h` : 'Loading...'}</p>
        </div>

    )
}

export default Country