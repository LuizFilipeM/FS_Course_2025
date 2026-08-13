const Course = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
      {props.course.parts.map(parte => <p key={parte.id}>{parte.name} {parte.exercises}</p> )}
      <strong>Total exercises: {props.course.parts.reduce((a, b) => a + b.exercises, 0)}</strong>
    </div>
  )
}

export default Course