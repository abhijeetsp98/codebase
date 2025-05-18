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
            <a href="/userManagement" className="item ">
                <BiHome className='logo-icon'/>
                Dashboard Overview
            </a>
            <a href="/userManagement" className="item ">
                <BiHome className='logo-icon'/>
                Labour Management
            </a>
            <a href="/rolesManagement" className="item ">
                <BiHome className='logo-icon'/>
                Admin Roles & Permissions
            </a>
            <a href="/inventoryManagement" className="item ">
                <BiHome className='logo-icon'/>
                Inventory Management
            </a>
            <a href="/" className="item ">
                <BiHome className='logo-icon'/>
                Supplier Management
            </a>
            <a href="/" className="item ">
                <BiHome className='logo-icon'/>
                Dish Management
            </a>
            <a href="/alltask" className="item ">
                <BiHome className='logo-icon'/>
                Order Management
            </a>
            <a href="/" className="item ">
                <BiHome className='logo-icon'/>
                Reports & Analytics
            </a>
            <a href="/" className="item ">
                <BiHome className='logo-icon'/>
                Settings
            </a>
            <a href="/" className="item ">
                <BiHome className='logo-icon'/>
                Help & Support
            </a>
           




            <a href="/" className="item">
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