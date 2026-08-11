const App = () => { 
  const course = {
    name: 'Desenvolvimento de aplicação Half Stack',
    parts: [
      {
        name: 'Fundamentos da biblioteca React',
        exercises: 10
      },
      {
        name: 'Usando props para passar dados',
        exercises: 7
      },
      {
        name: 'Estado de um componente',
        exercises: 14
      }
    ]
  }

  return (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total exercises={course.parts} />
  </div>
)

}

  const Header = (props) => {
    //console.log("Props do Header")
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
  }

  const Content = (props) => {
    //console.log("Props do Content")
    return (
      <div>
        <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
        <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
        <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
      </div>
  )
  }

  const Part = (props) => {
    //console.log("Props do Part")
    return (
      <>
        <p>
          {props.part} {props.exercises}
        </p>
      </>
    )
  }

  const Total = (props) => {
    //console.log("Props do Total")
    return (
      <>
        <p>Number of exercises {props.exercises[0].exercises + props.exercises[1].exercises + props.exercises[2].exercises}</p>
      </>
    )
  }



export default App