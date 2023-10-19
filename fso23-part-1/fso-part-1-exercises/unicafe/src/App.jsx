import { useState } from 'react'
import React from 'react'
const Button = (props) => {
  return(
    <button onClick = {props.handleClick}>
      {props.text}
    </button>
    
  )
}
const StatisticLine = (props) => {
  return(
    <div>{props.text} {props.value}</div>
  )
}
const Statistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral === 0){
    return(
      <></>
    )
  }else{
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td><StatisticLine text = "Good" value = {props.good}/></td>
            </tr>
            <tr>
              <td><StatisticLine text = "Bad" value = {props.bad}/></td>
            </tr>
            <tr>
              <td><StatisticLine text = "Neutral" value = {props.neutral}/></td>
            </tr>
            <tr>
              <td><StatisticLine text = "All" value = {props.good + props.bad + props.neutral}/></td>
            </tr>
            <tr>
              <td><StatisticLine text = "Average" value = {(props.good - props.bad) / (props.good + props.bad + props.neutral)} />  </td>
            </tr>
            <tr>
              <td><StatisticLine text = "Positive" value = {(props.good) / (props.good + props.bad + props.neutral) * 100}/></td>
            </tr>
          </tbody>
        </table>
      
      
      </>
    )
  }
}

const Display = (props) => {
  // let statistics = <tbody><tr><StatisticLine text = "Good" value = {props.good}/></tr><tr><StatisticLine text = "Neutral" value = {props.neutral}/></tr> <tr><StatisticLine text = "Bad" value = {props.bad}/></tr> <tr><StatisticLine text = "All" value = {props.good + props.neutral + props.bad}/></tr> <tr><StatisticLine text = "Average" value = {(props.good - props.bad) / (props.good + props.neutral + props.bad)}/></tr><tr><StatisticLine text = "Positive" value = {((props.good)/ (props.good + props.neutral + props.bad)) * 100} /></tr></tbody>

  if (props.good === 0 && props.bad === 0 && props.neutral === 0){
    return(
      <>
      
      <div>No feedback given</div>
     
      </>
    )
  }else{
    return(
      <>

      </>
       
     )
  }
}
function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGoodValue = newValue => {
    console.log('good value now', newValue)
    setGood(newValue)
  }
  const setToNeutralValue = newValue => {
    console.log('neutral value now', newValue)
    setNeutral(newValue);    
  }

  const setToBadValue = newValue => {
    console.log('bad value now', newValue)
    setBad(newValue)
  }
  
  
  return (
    <>
    <h2>Give feedback</h2>
     <Button handleClick = {() => setToGoodValue(good + 1)} text = "good"/>
     <Button handleClick = {() => setToNeutralValue(neutral + 1)} text = "neutral"/>
     <Button handleClick = {() => setToBadValue(bad + 1)} text = "bad"/>
     <h2>Statistics</h2>
     <Display good = {good} neutral = {neutral} bad = {bad}/>
     {/* statistics = <tbody><tr><StatisticLine text = "Good" value = {props.good}/></tr><tr><StatisticLine text = "Neutral" value = {props.neutral}/></tr> <tr><StatisticLine text = "Bad" value = {props.bad}/></tr> <tr><StatisticLine text = "All" value = {props.good + props.neutral + props.bad}/></tr> <tr><StatisticLine text = "Average" value = {(props.good - props.bad) / (props.good + props.neutral + props.bad)}/></tr><tr><StatisticLine text = "Positive" value = {((props.good)/ (props.good + props.neutral + props.bad)) * 100} /></tr></tbody> */}
    
     <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </>
  )
}

export default App
