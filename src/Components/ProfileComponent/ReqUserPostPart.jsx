import React, { useEffect, useState } from 'react'
import { AiOutlineTable, AiOutlineUser } from 'react-icons/ai'
import { RiVideoAddLine } from 'react-icons/ri'
import { BiBookmark } from "react-icons/bi";
import ReqUserPostCard from './ReqUserPostCard';
import { useDispatch, useSelector } from 'react-redux';
import { reqUserPostAction } from '../../Redux/Post/Action';

function ReqUserPostPart() {
    const [activeTab, setActiveTab] = useState('Posts');
   const dispatch = useDispatch();
   const token = localStorage.getItem('token');
   const {user,post} = useSelector(store=>store);
   console.log("posts",post)
   const tabs = [
        {
            tab: "Posts",
            icon: <AiOutlineTable></AiOutlineTable>
        },
        {
            tab: "Reels",
            icon: <RiVideoAddLine></RiVideoAddLine>
        },
        {
            tab: "Saved",
            icon: <BiBookmark></BiBookmark>
        },
        {
            tab: "Tagged",
            icon: <AiOutlineUser></AiOutlineUser>
        }
    ]

    useEffect(()=>{
        const data ={
            jwt:token,
            userId:user.findByUserName?.id,
        }
        dispatch(reqUserPostAction(data));
    },[user.findByUserName,post.createPost])

    return (
        <div>
            <div className='flex space-x-14 border-t relative'>
                {tabs.map((item) =>
                    <div onClick={() => setActiveTab(item.tab)} className={`${activeTab === item.tab ? "border-t border-black" : "opacity-60"} flex items-center cursor-pointer py-2 text-sm`}>
                        <p>{item.icon}</p>
                        <p className='ml-2'>{item.tab}</p>
                    </div>
                )}
            </div>
            <div>
                <div className='flex flex-wrap'>
                  {activeTab === "Posts" ? post.reqUserPost?.map((item)=><ReqUserPostCard post={item}/>):user.findByUserName?.savedPost?.map((item)=><ReqUserPostCard post={item}/>) }
                </div>
            </div>
        </div>
    )
}

export default ReqUserPostPart
