import React from 'react'
import ContentHeader from '../components/ContentHeader'
import "../styles/content.css" 
import Card from '../components/HomeCard'
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