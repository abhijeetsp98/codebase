import React from 'react'
import ContentHeader from './ContentHeader'
import "../styles/content.css" 
import Card from './Card'
import TeacherList from './TeacherList'

const Content = () => {
  return (
    <div>
        <div className="content">
            <ContentHeader/>
            <Card/>
            <TeacherList/>
        </div>
    </div>
  )
}

export default Content;