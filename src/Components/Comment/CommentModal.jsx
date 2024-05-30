import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import CommentCard from './CommentCard';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { RiSendPlaneLine } from 'react-icons/ri';
import './CommentModal.css'
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, findPostCommentAction } from '../../Redux/Comment/Action';
import { useParams } from 'react-router-dom';
import { store } from '../../Redux/Store/store';
import { findPostByIdAction } from '../../Redux/Post/Action';
import { timeDifference } from '../../Config/Logics';
export default function CommentModal({ onClose, isOpen, isSaved, isPostLiked, handleSavedPost, handlePostLike }) {
    const [showDropDown, setShowDropDown] = useState(false);

    const postId = useParams().postId;

    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const [commentContent, setCommentContent] = useState();
    const { comment, post, user } = useSelector(store => store);
    // console.log("post", post)
    useEffect(() => {
        const data = { jwt: token, postId }
        if (postId) {
            dispatch(findPostByIdAction(data))
        }
    }, [comment?.createdCommnet, postId,comment.likeCommnet])


    const handleClick = () => {
        setShowDropDown(!showDropDown);
    }
    return (
        <div>
            <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <div className='flex h-[75vh] relative'>
                            <div className='w-[45%] flex flex-col justify-center'>
                                <img className='max-h-full w-full ' src={post.singlePost?.image} alt="" />
                            </div>
                            <div className=' w-[50%]'>
                                <div>
                                    <div>
                                        <div className='flex justify-between items-center w-full py-4 px-5'>
                                            <div className='flex itms-center'>
                                                <img className='h-12 w-12 rounded-full' src={user.reqUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                                                <div className='pl-2' >
                                                    <p className='font-semibold text-sm '>{user.reqUser?.username}</p>
                                                    <p className='fon thin text-sm'>{post.singlePost?.location}</p>
                                                </div>
                                            </div>
                                            <div className='dropdown'>
                                                <BsThreeDots className='dots' onClick={handleClick} />
                                                <div className='dropdown-content'>
                                                    {showDropDown && <p className='bg-black text-white py-1 px-4 rounded-md cursor-pointer'>Delete</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='comment ml-6'>
                                            {post.singlePost?.comments?.map((item) => <CommentCard comment={item} />)}
                                        </div>
                                        <div className='absolute bottom-0 w-[52%]'>
                                            <div className='flex justify-between items-center w-full px-5 py-4'>
                                                <div className='flex items-center space-x-2'>
                                                    {
                                                        isPostLiked ?
                                                            <AiFillHeart className=" text-2xl hover:opacity-50 cursor-pointer text-red-700" onClick={handlePostLike} />
                                                            :
                                                            <AiOutlineHeart className=" text-2xl hover:opacity-50 cursor-pointer" onClick={handlePostLike} />
                                                    }
                                                    <FaRegComment className=" text-xl hover:opacity-50 cursor-pointer" />
                                                    <RiSendPlaneLine className=" text-xl hover:opacity-50 cursor-pointer" />
                                                </div>
                                                <div>
                                                    {
                                                        isSaved ? <BsBookmarkFill className=" text-xl hover:opacity-50 cursor-pointer" onClick={handleSavedPost} /> : <BsBookmark className=" text-xl hover:opacity-50 cursor-pointer" onClick={handleSavedPost} />
                                                    }

                                                </div>
                                            </div>
                                            <div>
                                                <div className='w-full py-2 px-5'>
                                                    {post.singlePost?.likedbyUsers.length > 0 && <p>{post.singlePost?.likedbyUsers.length} likes</p>}
                                                    <p className='opacity-70 py-2 cursor-pointer'>{timeDifference(post.singlePost?.createdAt)}</p>
                                                </div>
                                                <div className='border border-t w-full'>
                                                    <div className='flex w-full  items-center px-5 w-full'>
                                                        <BsEmojiSmile />
                                                        <input
                                                            className='commentInput '
                                                            type="text"
                                                            name=""
                                                            id=""
                                                            placeholder='Add a comment...'
                                                            onChange={(e) => setCommentContent(e.target.value)}
                                                            value={commentContent}
                                                            onKeyPress={(e) => {
                                                                if (e.key === "Enter") {
                                                                    const data = {
                                                                        postId,
                                                                        jwt: token,
                                                                        data: {
                                                                            content: commentContent
                                                                        }
                                                                    }
                                                                    dispatch(createCommentAction(data))
                                                                    setCommentContent("")
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}
