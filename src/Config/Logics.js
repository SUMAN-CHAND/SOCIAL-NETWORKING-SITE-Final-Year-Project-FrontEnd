export const isPostLikedByUser = (post, userId) => {
    for (let item of post.likedbyUsers) {
        if (item.id === userId) return true;
    }
    return false;
}

export const isCommentLikedByUser = (comment, userId) => {
    for (let item of comment.likedbyUsers) {
        if (item.id === userId) return true;
    }
    return false;
}
export const isSavedPost = (user, postId) => {
    for (let item of user.savedPost) {
        if (item.id === postId) return true;
    }
    return false;
}

export const isFollowing = (reqUser, user2) => {
    if (reqUser && user2) {
        for (let item of user2.folllower) {
            if (reqUser.id === item.id) return true;
        }
    }

    return false;
}

export const timeDifference = (timestamp) => {
    //1 min ago 
    // 1hr ago

    const date = new Date(timestamp);
    const diff = Date.now() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const houres = Math.floor(minutes / 60);
    const days = Math.floor(houres / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
        return weeks + " weeks" + (weeks === 1 ? "" : "s") + " ago";
    }
    else if (days > 0) {
        return days + " day" + (days === 1 ? "" : "s") + " ago";
    }
    else if (houres > 0) {
        return houres + " hour" + (houres === 1 ? "" : "s") + " ago";
    }
    else if (minutes > 0) {
        return minutes + " minute" + (minutes === 1 ? "" : "s") + " ago";
    }
    else if (seconds > 0) {
        return seconds + " second" + (seconds === 1 ? "" : "s") + " ago";
    }
}

function getTimeInHours (timestamp){
    const date = new Date(timestamp);
    const hours = date.getHours();
    return hours;
}

export  const hasStory=(users) =>{
    const temp = users.reduce((acc,item) => {
        if(item.storys?.length > 0) {
            const time = getTimeInHours(
                item.storys[item.storys?.length - 1].timestamp
            );
            if(time<24){
                acc.push(item);
            }
        }
        return acc;
    },[]);
    return temp;
}