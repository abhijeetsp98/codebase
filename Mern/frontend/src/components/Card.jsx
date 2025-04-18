import {BiUserCircle , BiCheckSquare , BiAddToQueue  } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const tasks = [
    {
        title : 'Assign Task',
        icon : <BiUserCircle />,
        path : '/assigntask',
    },
    {
        title : 'Completed Task',
        icon : <BiCheckSquare />,
        path : '/completedtask',
    },
    {
        title : 'Create Task',
        icon : <BiAddToQueue />,
        path : '/createtask',
    }
]

const Card = () => {      
    const navigate = useNavigate();              
    return (
        <div className="card--container">
            {tasks.map((task) => (
                <div 
                    className="card"
                    onClick={() => navigate(task.path)}
                >
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