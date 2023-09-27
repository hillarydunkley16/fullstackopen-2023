const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
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
const Content = (props) => {
  return(
    <>
    <Part name = {props.parts[0].name} num = {props.parts[0].exercises}/>
    <Part name = {props.parts[1].name} num = {props.parts[1].exercises}/>
    </>
  )
}

const Total = (props) => {
  return (
    <>
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half stack application development', 
    parts: [
      {
        name: 'Fundamentals of React', 
        exercises: 10
      },
      {
        name: 'Using props to pass data', 
        exercises: 7
      },
      {
        name: 'State of a component', 
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
      <Hello/>
    </div>
  )
}

const Hello = (props) => {

  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>

      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

export default App