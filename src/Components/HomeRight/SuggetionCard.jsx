import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUserAction } from '../../Redux/User/Action';
import { isFollowing } from '../../Config/Logics';

var isFollow = false;
export default function SuggetionCard({ suggestdUser }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { user } = useSelector(store => store);
  const followUser = () => {
    const data = {
      jwt: token,
      userId: suggestdUser.id
    }
    dispatch(followUserAction(data));
  }

  useEffect(() => {
    isFollow = isFollowing(user.reqUser, suggestdUser);
  }, [suggestdUser, user, user.followUser, user.unFollowUser])

  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-centter'>
        <img className='w-9 h-9 rounded-full' src={suggestdUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
        <div className='ml-2'>
          <p className='text-sm font-semibold'>{suggestdUser?.name}</p>
          <p className='text-sm font-semibold opacity-70'>Populer</p>
        </div>
      </div>
      {isFollow ? <>
        <p className='text-blue-700 text-sm font-samibold cursor-pointer'>Followed</p>
      </> : <>
        <p className='text-blue-700 text-sm font-samibold cursor-pointer' onClick={followUser}>Follow</p>
      </>}
    </div>
  )
}
