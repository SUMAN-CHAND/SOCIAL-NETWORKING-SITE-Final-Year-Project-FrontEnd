import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProfileUserDetails() {
    const navigate = useNavigate();
    const { user,post } = useSelector(store => store);

    console.log("User", user)
    return (
        <div>
            <div className='py-10 w-full'>
                <div className='flex items-center'>
                    <div className='mx-1.5'>
                        <img className='w-32 h-32 rounded-full ' src={user.findByUserName?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                    </div>
                    <div className='space-y-5 w-[81%]'>
                        <div className='flex space-x-10 items-center'>
                            <p>{user?.findByUserName?.username}</p>
                            <button onClick={() => navigate('/account/edit')}>Edit Profile</button>
                            <IoSettingsOutline />
                        </div>
                        <div className='flex space-x-10'>
                            <div>
                                <span className='font-semibold mr-2 '>{post.reqUserPost?.length}</span>
                                <span>Posts</span>
                            </div>
                            <div>
                                <span className='font-semibold mr-2 '>{user.findByUserName?.folllower.length}</span>
                                <span>Follower</span>
                            </div>
                            <div>
                                <span className='font-semibold mr-2 '>{user.findByUserName?.following.length}</span>
                                <span>Following</span>
                            </div>
                        </div>
                        <div>
                            <p className='font-semibold'>{user.findByUserName?.name}</p>
                            <p className='font-thin text-sm'>
                                {user.findByUserName?.bio}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileUserDetails
