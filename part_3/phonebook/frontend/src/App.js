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
  const [ notificationMessage, setNotificationMessage] = useState(null) 
  const [ errorMSG, setErrorMSG] = useState(false) 
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
        id: findNextId()
    }
    console.log(findNextId())
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
          setNotificationMessage(`Changed number for ${nameObject.name}`)  
          setTimeout(() => {          
            setNotificationMessage(null)       
          }, msgTime)
        })
        .catch(error => {
          setNotificationMessage(error.response.data.error)
          console.log(error.response.data.error)
          //setNotificationMessage(`Information of ${nameObject.name} has already been removed from server`)
          setErrorMSG(true)
          //setPersons(persons.filter(person => person.id !== existingPerson[0].id) )
          setTimeout(() => {          
            setNotificationMessage(null)       
            setErrorMSG(false)
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
          setNotificationMessage(`Added ${nameObject.name}`)  
          setTimeout(() => {          
            setNotificationMessage(null)       
          }, msgTime)
        })
        .catch(error => {
          setNotificationMessage(error.response.data.error)
          setErrorMSG(true)
          setTimeout(() => {          
            setNotificationMessage(null)       
            setErrorMSG(false)
          }, msgTime)
          console.log(error.response.data.error)
        })
    }
  } 
  
  //Finds biggest id number and returns number bigger by one. Othervise removing person before last person of the list might create error when trying to add new person.
  const findNextId = () =>{
    const idList = persons.map(person => person.id+1)
    return Math.max(idList)+1
  }

  const Notification = ({ message, error }) => {
    var notificationStyle = {   
      color: "green",
    }

    if (message === null) {
      return null
    }

    if (errorMSG)
    {
      notificationStyle = {   
        color: 'red'
      }
    }

    console.log(errorMSG)

    return (
      <div className='notification' style={notificationStyle}>
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
          setNotificationMessage(`Information of ${name} was removed from server`)
          setTimeout(() => {          
            setNotificationMessage(null)       
          }, msgTime)
        })
        .catch(error => {
          setNotificationMessage(`Information of ${name} has already been removed from server`)
          setErrorMSG(true)
          setPersons(persons.filter(person => person.id !== id) )
          setTimeout(() => {          
            setNotificationMessage(null)  
            setErrorMSG(false)
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
      <Notification message={notificationMessage}/>
      <Filter newFilter={newFilter} handleChange={handleChange} />
      <Form handleSubmit={addPerson} newName={newName} newNumber={newNumber} handleChange={handleChange} />
      <Numbers persons={persons} showAll={showAll} newFilter={newFilter} del={del} />
    </div>
  )
}

export default App