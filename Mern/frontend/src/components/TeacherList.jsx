import React from 'react'
import '../styles/teacherList.css'

const teachers = [
  {
    name:"Abhijeet",
    duration: '2hr',
    cost: '$100',
    dish: "Pizza"
  },
  {
    name:"Akshay",
    duration: '1hr',
    cost: '$70',
    dish: "Burger"
  },
  {
    name:"Rahul",
    duration: '5hr',
    cost: '500',
    dish : "Pastry"
  }
]

const TeacherList = () => {
  return (
    <div>
      <div className='teacher--list'>
        <div className='list--header'>
          <h2>Task list</h2>
          <select>
            <option value="English"> English</option>
            <option value="English"> Hindi</option>
          </select>
        </div>
      </div>

      <div className='list--container'>
        {teachers.map((teacher) => (
          <div className='list'>
            <h2>Owner : {teacher.name} </h2>
            <span>DishName {teacher.name} </span> 
            <span>Time : {teacher.duration} </span> 
            <span>Cost : {teacher.cost} </span> 
          </div>
        ))}

      </div>
    </div>
  )
}

export default TeacherList