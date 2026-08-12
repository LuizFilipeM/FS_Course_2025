import { useState } from 'react'

const Showstatistics = (props) => {
  if (props.total === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={props.good} />
        <StatisticLine text="Neutral" value={props.neutral} />
        <StatisticLine text="Bad" value={props.bad} />
        <StatisticLine text="All" value={props.total} />
        <StatisticLine text="Average" value={props.average} />
        <StatisticLine text="Positive" value={`${props.positivePercentage}%`} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}


const Buttons = (props) => {
  return (
    <div>
      <button onClick={props.HandleClick}>{props.text}</button>
    </div>
  )
}


const App = () => {
  
  const [good, setGood] = useState(1)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(1)
  const [average, setAverage] = useState(0)
  const [positivePercentage, setPositivePercentage] = useState(0)


  const HandleGoodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setAverage((good + 1 - bad) / (total + 1))
    setPositivePercentage(((good + 1) / (total + 1)) * 100)
  } 

  const HandleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
    setAverage((good - bad) / (total + 1))
    setPositivePercentage(((good) / (total + 1)) * 100)
  }

  const HandleBadClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setAverage((good - bad - 1) / (total + 1))
    setPositivePercentage(((good) / (total + 1)) * 100)
  }
    
  
  return (
    <div>
      <h1>Give feedback</h1>
      <Buttons HandleClick={HandleGoodClick} text="Good" />
      <Buttons HandleClick={HandleNeutralClick} text="Neutral" />
      <Buttons HandleClick={HandleBadClick} text="Bad" />
      <h2>Statistics</h2>
      <Showstatistics total={total} good={good} neutral={neutral} bad={bad} average={average} positivePercentage={positivePercentage}/>
      
    </div>
  )

}

export default App