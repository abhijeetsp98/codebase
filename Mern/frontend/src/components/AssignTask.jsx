import React from 'react'
import ContentHeader from './ContentHeader'
import "../styles/content.css" 
import Card from './Card'
import AssignTaskList from './AssignTaskList'

const AssignTask = () => {
  return (
    <div>
        <div className="content">
            <ContentHeader/>
            <Card/>
            <AssignTaskList/>
        </div>
    </div>
  )
}

export default AssignTask;