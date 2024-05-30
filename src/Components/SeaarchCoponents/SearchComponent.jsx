import React from 'react'
import './SearchComponent.css'
import SearchUserCard from './SearchUserCard'
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAction } from '../../Redux/User/Action';

export default function SearchComponent() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const { user } = useSelector(store => store);

    const handleSearch = (e) => {
        dispatch(searchUserAction({ jwt: token, query: e.target.value }));
    }

    return (
        <div className='searchContainer'>
            <div className='px-2 pb-5'>
                <h1 className='text-xl pb-5'>Search</h1>
                <input onChange={handleSearch} className='searchInput' type="text" placeholder='Search.....' />
            </div>
            <hr />
            <div className='px-3 pt-5 h-full max-h-80 overflow-hidden'>
                {user.searchUser?.map((item) => <SearchUserCard searchUser={item} />)}

            </div>
        </div>
    )
}
