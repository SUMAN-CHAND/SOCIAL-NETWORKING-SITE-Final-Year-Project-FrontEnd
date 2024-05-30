import { FOLLOW_USER, GET_USER_BY_USERNAME, GET_USER_BY_USER_IDS, POPULER_USER, REQ_USER, SEARCH_USER, UNFOLLOW_USER, UPDATE_USER } from "./ActionType"

const initialValue = {
    reqUser: null,
    findByUserName: null,
    findByUserIds: [],
    followUser: null,
    unFollowUser: null,
    searchUser: null,
    updatedUser: null,
    populerUser: [null],
}

 export const UserReducer = (store=initialValue,{type,payload}) => {
    if (type === REQ_USER){
        return {...store, reqUser: payload };
    }else if (type === GET_USER_BY_USERNAME) {
        return{...store,findByUserName:payload};
    }
    else if (type === GET_USER_BY_USER_IDS) {
        return{...store,findByUserIds:payload};
    }
    else if (type === FOLLOW_USER) {
        return{...store,followUser:payload};
    }
    else if (type === UNFOLLOW_USER) {
        return{...store,unFollowUser:payload};
    }
    else if (type === SEARCH_USER) {
        return{...store,searchUser:payload};
    }
    else if (type === UPDATE_USER) {
        return{...store,updatedUser:payload};
    }
    else if (type === POPULER_USER) {
        return{...store,populerUser:payload};
    }
    return store;
}