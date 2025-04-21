import {BiUserCircle , BiCheckSquare , BiAddToQueue  } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const tasks = [
    {
        title : 'Dish List',
        icon : <BiUserCircle />,
        path : '/alldish',
    },
    {
        title : 'Assigned Task',
        icon : <BiCheckSquare />,
        path : '/assigntask',
    },
    {
        title : 'Create Dish Task',
        icon : <BiAddToQueue />,
        path : '/adddish',
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