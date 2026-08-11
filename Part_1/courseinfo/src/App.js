const App = () => { 
  const course = 'Desenvolvimento de aplicação Half Stack'

  const parts = [
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

  return (
  <div>
    <Header course={course} />
    <Content part1={parts} />
    <Total exercises1={parts} />
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
        <Part part={props.part1[0].name} exercises={props.part1[0].exercises}/>
        <Part part={props.part1[1].name} exercises={props.part1[1].exercises}/>
        <Part part={props.part1[2].name} exercises={props.part1[2].exercises}/>
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
        <p>Number of exercises {props.exercises1[0].exercises + props.exercises1[1].exercises + props.exercises1[2].exercises}</p>
      </>
    )
  }



export default App