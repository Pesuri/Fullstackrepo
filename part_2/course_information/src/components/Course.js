import React from 'react'

const Course = ({course}) => {
    return (
        <div>
        <Header name={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
        </div>
    )
}

const Content = ({parts}) => {
    return (
      <div>
        {parts.map((part) =>
          <Part key={part.id} part={part}/>
        )}
      </div>
    )
}

const Part = ({part}) => {
    return (
        <div>
        <p>{part.name} {part.exercises}</p>
        </div>
    )
}

const Header = ({name}) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
}
  
const Total = ({parts}) => {
  const sum = parts.reduce((value, part) => value + part.exercises,0)
  return (
    <div>
      <b><p>total of {sum} exercises</p></b>
    </div>
  )
}

export default Course