const Header = ({ header }) => <h2>{header}</h2>


const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exc={part.exercises}
        />
      )}
    </div>
  )
}


const Part = ({ name, exc }) => <p>{name} {exc}</p>


const Total = ({ parts }) => 
<b>total of {parts.reduce((sum, parts) => sum + parts.exercises, 0)} exercises</b>


const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course