const Countries = ({countriesToShow, details, handleChange, weather}) => {
    if (details === 0)
    {
        return(
            <div>
                There are too many countries matching the query.
            </div>
        )
    }
    else if (details === 1 && weather !== '')
    {
        const country = countriesToShow[0]

        return(
            <div>
                <h1>{country.name}</h1>
                <table>
                    <tbody>
                        <tr>
                            <td><b>Capital:</b></td><td>{country.capital}</td>
                        </tr>
                        <tr>
                            <td><b>Population:</b></td><td>{country.population}</td>
                        </tr>
                        <tr>
                            <td><h3>Spoken languages:</h3> 
                                <ul>
                                {country.languages.map(language =>
                                <li key={language.name}>
                                    {language.name}
                                </li>
                                )}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <img src={country.flag} alt="flag" style={{width: 150, border: "solid"}} />
                </div>

                <h3>Weather in {country.capital}</h3>
                <p><b>temperature:</b> {weather.main.temp-273.15}<br />
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather" /><br />
                <b>wind:</b> {weather.wind.speed} m/s, direction {weather.wind.deg} degrees
                </p>
            </div>
        )
    }
    else
    {
        return(
            <div>
                <h2>Countries</h2>
                <form>
                    <table>
                        <tbody>
                            {countriesToShow.map(country =>
                                <tr key={country.name}>
                                    <td style={{width: 200}}>{country.name}</td>
                                    <td><button type="button" value={country.name} onClick={handleChange}>Show</button></td> 
                                </tr>
                            )}
                            
                        </tbody>  
                    </table>
                </form>
            </div>
        )
    }


}

export default Countries