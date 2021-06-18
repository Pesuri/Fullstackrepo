import React from 'react'

const Numbers = ({persons, showAll, newFilter, del}) => {

    const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.includes(newFilter))

    return(
    <div>
        <h2>Numbers</h2>
        {personsToShow.map(person =>
            <div key={person.id}>
                {person.name} {person.number} 
                <button onClick={() => del(person.id, person.name)}>delete</button>
            </div>
        )}
    </div>
    )
}

export default Numbers