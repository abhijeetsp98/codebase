import {BiUserCircle , BiCheckSquare , BiAddToQueue  } from 'react-icons/bi';
const tasks = [
    {
        title : 'Assign Task',
        icon : <BiUserCircle    />,
    },
    {
        title : 'Complete Task',
        icon : <BiCheckSquare  />,
    },
    {
        title : 'Create Task',
        icon : <BiAddToQueue />,
    }
]

const Card = () => {                    
  return (
    <div className="card--container">
        {tasks.map((task) => (
            <div className="card">
                <div className="card--cover">
                    {task.icon}
                </div>
                <div className="card--title">
                    <h2>{task.title}</h2>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Card;