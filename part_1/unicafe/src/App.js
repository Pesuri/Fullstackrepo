import React, { useState } from 'react'

const tdStyle = {
  width: '60px',
};

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue = (newValue,set) => () => {    
    set(newValue)  
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToValue(good + 1, setGood)} text="good" />
      <Button handleClick={() => setToValue(neutral + 1, setNeutral)} text="neutral" />
      <Button handleClick={() => setToValue(bad + 1, setBad)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

const Button = ({handleClick,text}) => (
  <button onClick={handleClick()}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0)
  {
    return "No feedback given"
  }
  return (
    <div>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={good+neutral+bad} />
        <Statistic text="average" value={average(good, neutral, bad)} />
        <Statistic text="positive" value={positive(good, neutral, bad)} />
    </div>
  )
}

const Statistic = ({text, value}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td style={tdStyle}>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}


const average = (good, neutral, bad) => 
{
  return (good - bad) / (good + neutral + bad)
}

const positive = (good, neutral, bad) => 
{
  return String((good) / (good + neutral + bad) * 100)+" %"
}

export default App