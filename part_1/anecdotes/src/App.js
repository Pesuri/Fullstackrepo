import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setToVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))

  const setToValue = () => () => {    
    setSelected(RandomInt(0,anecdotes.length, selected))
  }

  const setVotes = (index) => () => {
    const copy = [...votes]
    copy[index] += 1
    setToVotes(copy)
    //console.log(index, copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} {voteText(votes[selected])}
      <br />
      <Button handleClick={() => setVotes(selected)} text="vote" />
      <Button handleClick={() => setToValue()} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      {mostVotes(votes, anecdotes)}
    </div>
  )
}

const voteText = (value) => {
  if (value === 1) //If there is only one vote, "vote" is returned. Otherwise "votes" is returned.
  {
    return "vote"
  }
  return "votes"
}

const mostVotes = (votes, anecdotes) => {
  var max = 0
  var index = 0
  //For loop goes through array and finds highest value and its index.
  for (var i = 0; i < votes.length; i++)
  {
    if (votes[i] > max)
    {
      max = votes[i]
      index = i
    } 
  }

  //Returns anecdote with highest votes
  return (
    <div>
    {anecdotes[index]}
    <br />
    has {max} {voteText(max)}
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick()}>
    {text}
  </button>
)

const RandomInt = (min, max, selected) => {
  var number = 0
  //As long as result is same as current anecdote, loop repeats
  //Quarantees different anecdote for each button press
  while(true) 
  {
    min = Math.ceil(min)
    max = Math.floor(max)
    number = Math.floor(Math.random() * (max - min) + min)
    if (number !== selected)
    {
      break
    }
  }
  //console.log(min, max, number)
  return number
}

export default App