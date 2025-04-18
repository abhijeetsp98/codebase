import React from 'react'
import ContentHeader from './ContentHeader'
import "../styles/content.css" 
import Card from './Card'
import CompletedTaskList from './CompletedTaskList'

const CompletedTask = () => {
  return (
    <div>
        <div className="content">
            <ContentHeader/>
            <Card/>
            <CompletedTaskList/>
        </div>
    </div>
  )
}

export default CompletedTask;