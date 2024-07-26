import React, { useState } from 'react'
import { AiOutlineGlobal } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { FaTh, FaBars, FaHome } from 'react-icons/fa'
import { GrResources } from 'react-icons/gr'
import { IoPeopleOutline, IoSettingsOutline } from 'react-icons/io5'
import { TbLetterB } from 'react-icons/tb'
import { NavLink, Outlet } from 'react-router-dom'

const Sidebar = ({children}) => {
    const [isOpen, setIsOpen] = useState(true)
    const toggle = () => setIsOpen(!isOpen)
    const menuItem = [
        {
            path: "/home",
            name: "Home",
            icon: <FaHome />
        },
        {
            path: "/categories",
            name: "Categories",
            icon: <BiCategory />
        },
        {
            path: "/faqs",
            name: "Faqs",
            icon: <IoPeopleOutline />
        },
        {
            path: "/news",
            name: "News",
            icon: <AiOutlineGlobal />
        },
        {
            path: "/blogs",
            name: "Blogs",
            icon: <TbLetterB />
        },
        {
            path: "/services",
            name: "Services",
            icon: <IoSettingsOutline />
        },
        {
            path: "/sources",
            name: "Sources",
            icon: <GrResources />
        },
    ]
  return (
    <div className='flex'>
        <div style={{width: isOpen ? "300px" : "75px"}} className='sidebar w-[300px] h-[100vh] text-[#000] bg-cyan-600'>
            <div className='px-2 py-2 flex items-center justify-between'>
                <h1 style={{display: isOpen ? "block" : "none"}} className="logo text-2xl p-3 text-center">Loyal Admin</h1>
                <div className='flex items-center text-[20px]'>
                    <FaBars style={{marginLeft: isOpen ? "block" : "15px"}} className='cursor-pointer' onClick={toggle} />
                </div>
            </div>

            {
                menuItem.map((item, index) => (
                    <NavLink className="flex text-xl py-3 px-6 gap-4 items-center hover:bg-[#4c8cd9] hover:text-white" to={item.path} key={index} activeClassName="active">
                        <div>{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none"}}>{item.name}</div>
                    </NavLink>
                ))
            }
        </div>
        <main className='w-[100%] p-5'><Outlet /></main>
    </div>
  )
}

export default Sidebar