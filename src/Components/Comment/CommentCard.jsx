import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { isCommentLikedByUser, timeDifference } from '../../Config/Logics';
import { useDispatch, useSelector } from 'react-redux';
import { likeCommentAction, unlikeCommentAction } from '../../Redux/Comment/Action';

export default function CommentCard({ comment }) {
    const [isCommentLiked, setIsCommentLiked] = useState(false);
    const token = localStorage.getItem('token');
    const { user } = useSelector(store => store);
    const dispatch = useDispatch();
    const data = {
        commnetId: comment.id,
        jwt: token
    }
    const handleLikeComment = () => {
        setIsCommentLiked(true)

        dispatch(likeCommentAction(data))
    }
    const handleUnLikeComment = () => {
        setIsCommentLiked(false)
        dispatch(unlikeCommentAction(data))

    }

    useEffect(()=>{
        setIsCommentLiked(isCommentLikedByUser(comment,user?.reqUser?.id))
    },[user?.reqUser?.id,comment])

    return (
        <div>
            <div className='flex items-center justify-between py-3'>
                <div className='flex items-center'>
                    <div>
                        <img className='w-9 h-9 rounded-full' src={comment.user.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                    </div>
                    <div className='ml-3'>
                        <p>
                            <span className='font-semibold'>{comment?.user.username}</span>
                            <span className='ml-2'>{comment.content}</span>
                        </p>
                        <div className='flex items-center space-x-3 text-x5 opacity-60 '>
                            <span >{timeDifference(comment.cratedAt)}</span>
                            {comment?.likedbyUsers?.length > 0 && <span>{comment?.likedbyUsers?.length} likes</span>}
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex items-center space-x-2'>
                        {
                            isCommentLiked ?
                                <AiFillHeart className=" text-xl hover:opacity-50 cursor-pointer text-red-700" onClick={handleUnLikeComment} />
                                :
                                <AiOutlineHeart className=" text-xl hover:opacity-50 cursor-pointer" onClick={handleLikeComment} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
