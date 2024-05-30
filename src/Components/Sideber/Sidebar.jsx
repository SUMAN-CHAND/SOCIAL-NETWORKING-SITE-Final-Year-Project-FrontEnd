import React, { useState } from 'react'
import { IoReorderThreeSharp } from "react-icons/io5";
import { mainu } from './SidebarConfig';
import { useNavigate } from 'react-router-dom';
import CreatPostModal from '../Posts/CreatPostModal';
import { useDisclosure } from '@chakra-ui/react';
import SearchComponent from '../SeaarchCoponents/SearchComponent';
import { useSelector } from 'react-redux';
import logo from '../../Img/111.png';
const Sidebar = () => {
    const [activeTab, setActiveTab] = useState();
    const [isSearchVisiable, setIsSearchVisiable] = useState(false);
    const navigate = useNavigate();
const{user} = useSelector(store=>store)

    const handleTabClick = (title) => {
        setActiveTab(title);
        if (title === "Profile") {
            navigate(`/${user.reqUser?.username}`)
        } else if (title === "Home") {
            navigate('/')
        }else if(title === "Create"){
            onOpen();
        }if(title === "Search"){
            setIsSearchVisiable(true);
        }else{
            setIsSearchVisiable(false);

        }

    }
    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <div className='sticky top-0 h-[100vh] flex'>
            <div className={`flex flex-col justify-between h-full ${activeTab !== "Search"?"px-10":"px-2"}`}>

              { <div>
                    {activeTab !== "Search" &&  <div className='pt-10'>
                        {/* <img className='w-40' src="https://i.imgur.com/zqpwkLQ.png" alt="" /> */}
                        <img className='w-40' src={logo} alt="" />
                    </div>}
                    <div className='mt-10'>
                        {mainu.map((item) =>
                            <div onClick={() => handleTabClick(item.title)} className='flex items-center mb-5 cursor-pointer text-lg'>
                               {activeTab === item.title ? item.activeIcon :item.icon}
                                {activeTab !== "Search" && <p className={`${activeTab === item.title?"font-bold":"semibold"}`}>{item.title}</p>}
                            </div>
                        )}
                    </div>
                </div>}
                <div className='flex items-center cursor-pointer pb-10'>
                    <IoReorderThreeSharp className='text-2xl' />
                   {activeTab !== "Search" && <p className='ml-5 '>More</p>}
                </div>
            </div>
            <CreatPostModal onClose={onClose} isOpen={isOpen} onOpen={onOpen}/>
           {isSearchVisiable && <SearchComponent/>}
        </div>
    )
}

export default Sidebar
