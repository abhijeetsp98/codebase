import {BiUserCircle , BiCheckSquare , BiAddToQueue  } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const tasks = [
    {
        title : 'All Dish',
        icon : <BiUserCircle />,
        path : '/alldish',
    },
    {
        title : 'Create Dish',
        icon : <BiCheckSquare />,
        path : '/adddish',
    },
    {
        title : 'Assign Dish',
        icon : <BiAddToQueue />,
        path : '/assignDish',
    }
]

const DishCard = () => {      
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

export default DishCard;