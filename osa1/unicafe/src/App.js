import { useState } from 'react'

const Header = (props) => <h1>{props.header}</h1>


const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}


const Statistics = (props) => {
  const sum = props.value.reduce((a, b) => a + b, 0)
  if (sum != 0) {
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.value[0]} />
          <StatisticLine text="neutral" value={props.value[1]} />
          <StatisticLine text="bad" value={props.value[2]} />
          <StatisticLine text="all" value={sum} />
          <StatisticLine text="average" value={props.average / sum} />
          <StatisticLine text="positive" value={((props.value[0] / sum) * 100) + ' %'} />
        </tbody>
      </table>
    </div>
  )
  }
  else {
    return (
      <p>No feedback given</p>
    )
  }
}


const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td> {props.value}</td>
    </tr>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [avg, setAvg] = useState(0)

  const feedback = {
    header1: 'give feedback',
    header2: 'statistics',
    criteria: ['good', 'neutral', 'bad']
  }

  return (
    <div>
      <Header header={feedback.header1}/>
      <Button handleClick={() => [setGood(good + 1), setAvg(avg + 1)]} text={feedback.criteria[0]}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={feedback.criteria[1]}/>
      <Button handleClick={() => [setBad(bad + 1), setAvg(avg - 1)]} text={feedback.criteria[2]}/>
      <Header header={feedback.header2} />
      <Statistics text={feedback.criteria} value={[good, neutral, bad]} average={avg}/>
    </div>
  )
}

export default App