import React from 'react'
import {
    BiBookAlt,
    BiHome,
    BiMessage,
    BiSolidReport,
    BiHelpCircle,
    BiStats,
    BiTask
} from 'react-icons/bi';
import "../styles/sidebar.css"

const Sidebar = () => {
  return (
    <div className='menu'>
        <div className='logo'>
            <BiBookAlt className='logo-icon'/>
            <h2>Inventory Management</h2>
        </div>

        <div className='menu--list'>
            <a href="/" className="item active">
                <BiHome className='logo-icon'/>
                Home
            </a>
            <a href="/alldish" className="item">
                <BiTask className='logo-icon'/>
                Dish
            </a>
            <a href="/allchef" className="item">
                <BiMessage className='logo-icon'/>
                Chef
            </a>
            <a href="/alltask" className="item">
                <BiStats className='logo-icon'/>
                Task
            </a>
            <a href="/allusers" className="item">
                <BiSolidReport className='logo-icon'/>
                Users
            </a>
            <a href="#" className="item">
                <BiHelpCircle className='logo-icon'/>
                Help
            </a>
        </div>
    </div>
  )
}

export default Sidebar