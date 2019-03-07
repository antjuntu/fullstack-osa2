import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => {
  return <h1>{text}</h1>
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
  
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part 
          key={part.id} 
          part={part} 
        />
      )}
    </div>
  )
}

// const Total = (props) => {
//   return <p>yhteensä {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} tehtävää</p>
// }

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10,
        id: 1
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7,
        id: 2
      },
      {
        name: 'Komponenttien tila',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
