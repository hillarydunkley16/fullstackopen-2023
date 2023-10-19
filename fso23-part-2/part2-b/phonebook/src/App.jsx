import { useState } from 'react'
import React from 'react'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput]= useState('')
  const personsToShow = persons.filter((el) => {
    if(searchInput === ''){
      return el
    }
    else{
      return el.name.toLowerCase().includes(searchInput)
    }
  })
 
  
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber, 
      id: persons.length + 1,
    }
    persons.map( person => {
      if (JSON.stringify(nameObject) === JSON.stringify(person)){
        alert(`${newName} is already added to phonebook`);
        console.log(`${newName} is already added to phonebook`)
      }else{
        setNewName('')
        setNewNumber('')
        setPersons(persons.concat(nameObject))
        console.log(persons)
      }
    })
    // setNewName('')
    // setPersons(persons.concat(nameObject))
    // console.log(persons)
  }
  const inputHandler = (event) => {
    // event.preventDefault()
    setSearchInput(event.value.toLowerCase())
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const Filter = (props) => {
    return (
      <>
        <input
        type = "search"
        placeholder = "search here"
        onChange = {props.inputHandler}
        value = {props.searchInput} 
        />
      </>
    )
  }
  const PersonForm = (props) => {
    return(
      <>
      <form onSubmit = {props.addName}>
        <div>
          name: <input value = {props.newName} onChange = {handleNameChange}/>
        </div>
        <div>number: <input value = {props.newNumber} onChange = {handleNumChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </>
    )
  }
  const Persons = (props) => {
    return(
      <>
      <ul>
      {personsToShow.map(person => <li key = {person.id}>{person.name} {person.number}</li>)}
      </ul>
      </>
    )
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Filter</h3>
      <Filter 
      inputHandler = {inputHandler} 
      searchInput = {searchInput}/>
      
      <h3>Add a name to the phonebook</h3>
      <PersonForm 
        addName = {addName} 
        newName = {newName} 
        handleNameChange = {handleNameChange} 
        newNumber = {newNumber} 
        handleNumChange = {handleNumChange}/>
      <h2>Contacts</h2>
      <Persons/>
    </div>
  )
}

export default App

