import React from 'react'

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ text }) => {
  return <h2>{text}</h2>
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

const Total = ({ parts }) => {
  const totalCourses = () => {
    return parts.reduce((acc, part) => {
      return acc + part.exercises
    }, 0)
  }
  return <p>yhteensä {totalCourses()} tehtävää</p>
}

export default Course