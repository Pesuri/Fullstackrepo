import React, { useEffect, useState } from 'react'
import Numbers from './components/Numbers'
import Form from './components/Form'
import Filter from './components/Filter'
import nameService from './services/communication'

const App = () => {
  const [ persons,     setPersons ] = useState([]) 
  const [ newName,    setNewName ] = useState('')
  const [ newNumber,  setNewNumber ] = useState('')
  const [ newFilter,  setNewFilter ] = useState('')
  const [ showAll,    setShowAll ] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null) 
  const msgTime = 3000

  useEffect(() => {
   nameService
      .getAll()   
      .then(initialPersons => {              
        setPersons(initialPersons)      
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
    }
    const existingPerson = persons.filter(person => person.name === nameObject.name)
   
    if (existingPerson.length > 0)
    {
      const result = window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)
      if (result)
      {
        nameService
        .update(existingPerson[0].id, nameObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson[0].id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setErrorMessage(`Changed number for ${nameObject.name}`)  
          setTimeout(() => {          
            setErrorMessage(null)       
          }, msgTime)
        })
        .catch(error => {
          setErrorMessage(`Information of ${nameObject.name} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== existingPerson[0].id) )
          setTimeout(() => {          
            setErrorMessage(null)       
          }, msgTime)
        })
      }
    }
    else
    { 
      nameService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setErrorMessage(`Added ${nameObject.name}`)  
          setTimeout(() => {          
            setErrorMessage(null)       
          }, msgTime)
      })
    }
  } 
  
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const del = (id, name) => {    
    const result = window.confirm(`Delete ${name}?`)
    if (result)
    {
      nameService
        .delet(id)
        .then( response => {
          setPersons(persons.filter(person => person.id !== id) )
          setErrorMessage(`Information of ${name} was removed from server`)
          setTimeout(() => {          
            setErrorMessage(null)       
          }, msgTime)
        })
        .catch(error => {
          setErrorMessage(`Information of ${name} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== id) )
          setTimeout(() => {          
            setErrorMessage(null)       
          }, msgTime)
        })
    }
  }

  const handleChange = (event) => {
    if (event.target.name === "name")
    {
      setNewName(event.target.value)
    }
    else if (event.target.name === "number")
    {
      setNewNumber(event.target.value)
    } 
    else if  (event.target.name === "filter")
    {
      setNewFilter(event.target.value)
      if (event.target.value.length > 0)
      {
        setShowAll(false)
      }
      else
      {
        setShowAll(true)
      }
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter newFilter={newFilter} handleChange={handleChange} />
      <Form handleSubmit={addPerson} newName={newName} newNumber={newNumber} handleChange={handleChange} />
      <Numbers persons={persons} showAll={showAll} newFilter={newFilter} del={del} />
    </div>
  )
}

export default App