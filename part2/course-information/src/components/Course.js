

const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Total = ({ parts }) => {

    const sum = parts
        .map(part => part.exercises)
        .reduce((acc, exercises) => acc += exercises)

    return (
        <p><b>Number of exercises {sum}</b></p>
    )
}


const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Course = ({ course }) => {

    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
}

export default Course;
