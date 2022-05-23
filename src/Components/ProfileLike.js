import React, { useEffect } from 'react'
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';
export default function ProfileLike({ postData, userData }) {
    useEffect(() => {
        let check = postData.likes.includes(userData.userId) ? true : false;
        setLike(check);
    }, [postData])
    const [like, setLike] = useState(null);
    const handleLike = () => {
        let narr = [];
        if (like == true) {
            narr = postData.likes.filter((el) => el != userData.userId);

        } else {
            narr = [...postData.likes, userData.userId];
        }
        database.posts.doc(postData.postId).update({
            likes: narr
        })
    }
    // console.log(postData);
    return (
        <>
        {
            like!==null && like===true?
            <FavoriteIcon onClick={handleLike} style={{
                color:'red',
                cursor:'pointer'
            }} />:
            <FavoriteIcon onClick={handleLike} style={{
                color:'black',
                cursor:'pointer'
            }} />
        }
            
        </>
    )
}
