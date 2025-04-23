import React from 'react'
import ContentHeader from '../components/ContentHeader'
import "../styles/content.css" 
import Card from '../components/HomeCard'
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