const mongoose = require('mongoose')

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]
var command = 'save'

if (process.argv.length < 3)
{
  console.log('undefined password')
  process.exit(1)
}

if (process.argv.length < 4)
{
  command = 'read'
}

const url =
  `mongodb+srv://new_user0:${password}@cluster0.redaa.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String,
})

const Person = mongoose.model('Person', personSchema)

if (command === 'save')
{
  const person = new Person({
    name: newName,
    number: newNumber,
    id: 1,
  })

  person.save().then(
    console.log(`added ${person.name} number ${person.number} to phonebook`),
    mongoose.connection.close()
  )
}
else if (command === 'read')
{
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}