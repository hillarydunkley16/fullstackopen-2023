import { useState } from 'react'

const Button = (props) => {
  return(
    <>
    <button onClick = {props.handleClick}>
      {props.text}
    </button>
    </>
  )
}

const MostVoted = (props) => {
  return (
    <>
      <h2>Anecdote with the most votes</h2>
      {!props.hasVotes && <>No anecdotes have been voted on yet.</>}
      {props.hasVotes && (
        <Anecdote anecdote={props.anecdote} votes={props.votes} />
      )}
    </>
  );
};

const Anecdote = (props)=> {
  return(
    <>
    {props.anecdote}
    <br/>
    has {props.votes} vote(s)
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // const points = new Array(anecdotes.length).fill(0); 
  // const points = new Array(anecdotes.length).fill(0); 
  // xsconst copy = {...points}; 
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [hasVotes, setMostVotes] = useState(false)
  const randomId = (length) => {
    return Math.floor(Math.random() * length); 
  }
  const incrementVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };
  const setToSelected = ()=> {
    let newValue; 
    do { 
      newValue = randomId(anecdotes.length); 
    }while(newValue === selected); 
    console.log("selected value now", newValue)
    setSelected(newValue)
  }
  const maxVote = votes.reduce(
    (acc, num, idx) => {
      if (num > acc.num) {
        acc.num = num;
        acc.idx = idx;
      }

      return acc;
    },
    { num: 0 }
  );

  const maxVotedAnecdote = anecdotes[maxVote.idx];
  return (
    <>
     <Anecdote anecdote = {anecdotes[selected]} votes = {votes[selected]} />
     <br/>
    <Button handleClick = {() => setToSelected(Math.random()*anecdotes.length)} text = "next anecdote" />
    <Button handleClick = {() => incrementVote()} text = "vote"/>
    <MostVoted
        hasVotes={hasVotes}
        anecdote={maxVotedAnecdote}
        votes={maxVote.num}
      />
    </>
  )
}

export default App
