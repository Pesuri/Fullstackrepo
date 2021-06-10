import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')
  const [ countriesToShow, setCountriesToShow ] = useState([])
  const [ showDetails, setShowDetails ] = useState(0)
  const [ weather, setWeather ] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        setCountries(response.data)
      })
  }, [])

  const getWeather = (country) => {
    axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
  }

  const handleChange = (event) => {
    setNewFilter(event.target.value)
    const filtered = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))

    if (filtered.length === 1)
    {
      setCountriesToShow(filtered)
      setShowDetails(1)
      getWeather(filtered[0])
    }
    else if (filtered.length <= 10)
    {
      setCountriesToShow(filtered)
      setShowDetails(2)
    }
    else
    {
      setShowDetails(0)
    }
  }
  
  return (
    <div>
      <Filter newFilter={newFilter} handleChange={handleChange} />
      <Countries countriesToShow={countriesToShow} details={showDetails} handleChange={handleChange} weather={weather} />
    </div>
  )
}

export default App