import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'


function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [filtered, setFiltered] = useState(false)

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setFiltered(true)
    if (event.target.value === "") {
      setFiltered(false)
    }
  }

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} filtered={filtered} newFilter={newFilter}
      setNewFilter={setNewFilter} />

    </div>
  )
}

export default App