import React from 'react'

const Header = (props) => {
    return (
      <>
        <h2>{props.course}</h2>
      </>
    )
  }
  const Part = (props) => {
    return(
      <>
      <p>{props.name} {props.num}</p>
      </>
    )
  }
  const Total = (props) => {
    const total = props.parts?.reduce(
      (prevValue, currentValue) => prevValue + currentValue.exercises,
      0
    );
    return <p>Total: {total}</p>;
  }
  
  
  const Content = (props) => {
    return(
      <>
      {props.parts?.map(content => {
        return(<Part name={content.name} exercises={content.exercises} key={content.name} />);
      }
    
  )}
      </>
    )
  }
  const Course = (props) => {
    return(
      <>
      <Header course = {props.course}/>
      <Content parts = {props.parts}/>
      <Total parts = {props.parts}/>
      </>
    )
  }

export default Course; 