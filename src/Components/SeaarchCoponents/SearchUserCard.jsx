import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { followUserAction } from '../../Redux/User/Action';
import { isFollowing } from '../../Config/Logics';

var isFollow = false;
export default function SearchUserCard({searchUser}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { user } = useSelector(store => store);
  const followUser = () => {
    const data = {
      jwt: token,
      userId: searchUser.id
    }
    dispatch(followUserAction(data));
  }

  useEffect(() => {
    isFollow = isFollowing(user.reqUser, searchUser);
  }, [searchUser, user, user.followUser, user.unFollowUser])


  return (
    <div className='flex justify-between items-center py-2 cursor-pointer px-2'>
      <div className='flex items-centter'  onClick={()=>navigate(`/${searchUser.username}`)}>
        <img className='w-9 h-9 rounded-full' src={searchUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
        <div className='ml-2'>
            <p className='text-sm font-semibold'>{searchUser?.name}</p>
            <p className='text-sm font-semibold opacity-70'>{searchUser?.username}</p>
        </div>
      </div>
      {isFollow ? <>
        <p className='text-blue-700 text-sm font-samibold cursor-pointer'>Followed</p>
      </> : <>
        <p className='text-blue-700 text-sm font-samibold cursor-pointer' onClick={followUser}>Follow</p>
      </>}
      {/* <p className='text-blue-700 text-sm font-samibold'>Follow</p> */}
    </div>
  )
}
