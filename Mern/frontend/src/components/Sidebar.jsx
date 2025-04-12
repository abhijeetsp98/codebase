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
            <h2>Inventory Applicaton</h2>
        </div>

        <div className='menu--list'>
            <a href="#" className="item">
                <BiHome className='logo-icon'/>
                Dashboard
            </a>
            <a href="#" className="item">
                <BiTask className='logo-icon'/>
                Assign
            </a>
            <a href="#" className="item">
                <BiSolidReport className='logo-icon'/>
                Report
            </a>
            <a href="#" className="item">
                <BiStats className='logo-icon'/>
                Stats
            </a>
            <a href="#" className="item">
                <BiMessage className='logo-icon'/>
                Message
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