import React, { useEffect, useState } from 'react'
import StuoryCircle from '../../Components/Story/StuoryCircle'
import HomeRight from '../../Components/HomeRight/HomeRight'
import PostCard from '../../Components/Posts/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { allPostsAction, findUserPostAction } from '../../Redux/Post/Action'
import { findUserByUserIdsAction, getPopulerUserAction, getUserProfileAction } from '../../Redux/User/Action'
import { hasStory } from '../../Config/Logics'
import CreateStoryCircle from '../../Components/Story/CreateStoryCircle'

const HomePage = () => {

    const dispatch = useDispatch();
    const [userIds, setUserIds] = useState([]);
    const { user, post } = useSelector(store => store);
    const token = localStorage.getItem('token');

    console.log("user", user)

    useEffect(() => {
        if (token) {
            dispatch(getUserProfileAction(token))
        }
    }, [token])
    useEffect(() => {
        if (user.reqUser?.id || user?.reqUser?.following.length > 0) {
            const newIds = user.reqUser.following.map((user) => user.id);
            console.log("newIds -----------", newIds)
            // setUserIds(user.reqUser.id, ...newIds);
            const combinedIds = [user.reqUser.id, ...newIds];
            setUserIds(combinedIds);
            console.log("UserIDs  -----------", userIds)

        } else {
            console.error("User or following data not available");
            // Handle the case where user data is missing
        }
        // if(user.reqUser){
        //     newIds = user.reqUser?.following?.map((user) => user.id);
        //     setUserIds(user.reqUser?.id, ...newIds);
        // }
        // console.log("newIds -----------",newIds)
        // console.log("UserIDs  -----------",userIds)
        // setUserIds(user.reqUser?.id,...newIds);
        // setUserIds(user.reqUser?.id, ...newIds ?? []);
        // if (newIds) {
        // } else {
        //     setUserIds(user.reqUser?.id);
        // }
    }, [user.reqUser, user.reqUser?.following])

    useEffect(() => {
        console.log("userIds ********************************-------------------- ", userIds)
        const data = {
            jwt: token,
            userIds: [userIds].join(","),
        }
        console.log("data post", data)
        dispatch(findUserPostAction(data));
        dispatch(findUserByUserIdsAction(data));
        dispatch(allPostsAction(data));
        dispatch(getPopulerUserAction(token))
    }, [userIds, post.createPost, post.deletePost])

    const storyUsers = hasStory(user.findByUserIds)
    console.log("storyUsers", storyUsers)
    console.log("Post ", post)
    return (
        <div>
            <div className='mt-10 flex w-[100%] justify-center'>
                <div className='w-[40%] px-10'>
                    <div className='storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full '>
                        <CreateStoryCircle user={user.reqUser}/>
                        {storyUsers.length > 0 && storyUsers.map((item) => <StuoryCircle user={item} />)}
                    </div>
                    {post.usersPost.length > 0 ?
                        <div className='space-y-10 w-full mt-10'>
                            {post.usersPost.length > 0 && post.usersPost.map((item) => <PostCard post={item} />)}
                        </div> :
                        <>
                            <div className='space-y-10 w-full mt-10'>
                                {post.allPost.map((item) => <PostCard post={item} />)}
                            </div>
                        </>
                    }
                </div>
                <div className='w-[27%]'>
                    <HomeRight />
                </div>
            </div>
        </div>
    )
}

export default HomePage
