import React, { useEffect, useState } from 'react'
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import './PostCard.css'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { RiSendPlaneLine } from 'react-icons/ri'
import CommentModal from '../Comment/CommentModal'
import { useDisclosure } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { likePostAction, savePostAction, unLikePostAction, unsavePostAction } from '../../Redux/Post/Action'
import { isPostLikedByUser, isSavedPost } from '../../Config/Logics'
import { useNavigate } from 'react-router-dom'

export default function PostCard({ post }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();
    const [showDropDown, setShowDropDown] = useState(false);
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const dispatch = useDispatch();

    const token = localStorage.getItem("token");
    const { user } = useSelector(store => store);

    const handleOpenCommentModal = () => {
        navigate(`/comment/${post.id}`);
        onOpen()
    }

    const data = { jwt: token, postId: post?.id }

    const handleSavedPost = () => {
        setIsSaved(true);
        dispatch(savePostAction(data))

    }
    const handleUnSavedPost = () => {
        setIsSaved(false);
        dispatch(unsavePostAction(data))

    }
    const handlePostLike = () => {
        setIsPostLiked(true)
        dispatch(likePostAction(data))

    }
    const handlePostUnLike = () => {
        setIsPostLiked(false)
        dispatch(unLikePostAction(data))

    }

    const handleClick = () => {
        setShowDropDown(!showDropDown);
    }
    
    // console.log(post)

    useEffect(() => {
        setIsPostLiked(isPostLikedByUser(post, user.reqUser.id));
        setIsSaved(isSavedPost(user.reqUser, post.id));
    }, [user.reqUser, post.likedbyUsers]);

    return (
        <div>
            <div className='border rounded-md w-full'>
                <div className='flex justify-between items-center w-full py-4 px-5'>
                    <div className='flex itms-center cursor-pointer'  onClick={()=>navigate(`/${post.user?.username}`)}>
                        <img className='h-12 w-12 rounded-full' src={post.user?.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                        <div className='pl-2' >
                            <p className='font-semibold text-sm '>{post.user?.username}</p>
                            <p className='fon thin text-sm'>{post?.location}</p>
                        </div>
                    </div>
                    <div className='dropdown'>
                        <BsThreeDots className='dots' onClick={handleClick} />
                        <div className='dropdown-content'>
                            {showDropDown && <p className='bg-black text-white py-1 px-4 rounded-md cursor-pointer'>Delete</p>}
                        </div>
                    </div>

                </div>
                <div className='w-full' >
                    <img className='w-full' src={post?.image} alt="" />
                </div>
                <div className='flex justify-between items-center w-full px-5 py-4'>
                    <div className='flex items-center space-x-2'>
                        {
                            isPostLiked ?
                                <AiFillHeart className=" text-2xl hover:opacity-50 cursor-pointer text-red-700" onClick={handlePostUnLike} />
                                :
                                <AiOutlineHeart className=" text-2xl hover:opacity-50 cursor-pointer" onClick={handlePostLike} />
                        }
                        <FaRegComment onClick={handleOpenCommentModal} className=" text-xl hover:opacity-50 cursor-pointer" />
                        <RiSendPlaneLine className=" text-xl hover:opacity-50 cursor-pointer" />
                    </div>
                    <div>
                        {
                            isSaved ? <BsBookmarkFill className=" text-xl hover:opacity-50 cursor-pointer" onClick={handleUnSavedPost} /> : <BsBookmark className=" text-xl hover:opacity-50 cursor-pointer" onClick={handleSavedPost} />
                        }

                    </div>
                </div>
                <div>
                    <div className='w-full py-2 px-5'>
                        {post?.likedbyUsers?.length > 0 && <p>{post?.likedbyUsers?.length} likes</p>}
                        {post?.comments?.length > 0 && <p className='opacity-70 py-2 cursor-pointer' onClick={handleOpenCommentModal} >view all {post?.comments?.length} comments</p>}
                    </div>
                    <div className='border border-t w-full'>
                        <div className='flex w-full  items-center px-5'>
                            <BsEmojiSmile />
                            <input className='commentInput' onClick={handleOpenCommentModal} type="text" name="" id="" placeholder='Add a comment...' />
                        </div>
                    </div>
                </div>
            </div>
            <CommentModal
                handlePostLike={handleClick}
                onClose={onClose}
                isOpen={isOpen}
                handleSavedPost={handleSavedPost} isPostLiked={isPostLiked} isSaved={isSaved} />
        </div>
    )
}
