//Code based on https://fullstackopen.com/en/part3 example.

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError')
  {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError')
  {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

//----This part isn't needed anymore
//let persons = []

var morgan = require('morgan')

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ]
      .join(' ')
  })
)

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
})

app.get('/info', (request, response) => {
  Person.find({})
    .then(persons => {
      const d = new Date()
      response.end(`Phonebook has info for ${persons.length} people \n${d}`)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person)
      {
        response.json(person)
      }
      else
      {
        response.status(404).end()
      }
    })
    .catch(error => next(error) )
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(
      console.log('ALL FINE'),
      response.status(204).end()
    )
    .catch(error => next(error))
})

//----This part isn't needed anymore
//const generateId = () => {
//  while (true)
//  {
//    const id = Math.floor(Math.random()*1000)
//    if (!persons.find(person => person.id === id))
//    {
//      return id
//    }
//  }
//}

//----This part isn't needed anymore
//const nameFound = (name) => {
//  return persons.find(person => person.name === name)
//}

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  //----These serve no purpose anymore.
  //if (!body.name) {
  //  return response.status(400).json({
  //    error: 'name missing'
  //  })
  //}
  //else if (!body.number) {
  //  return response.status(400).json({
  //    error: 'number missing'
  //  })
  //}
  //else if (nameFound(body.name)) {
  //  return response.status(400).json({
  //    error: 'name must be unique'
  //  })
  //}

  const person = new Person({
    name: body.name,
    number: body.number || false //,
    //id: generateId()
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON() )
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})