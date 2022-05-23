import React, { useEffect, useState } from 'react';
import './Like.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';
function Like({ userData, postData }) {
    const [like, setLike] = useState(null);
    useEffect(() => {
        let check = false;
        for (let i = 0; i < postData.likes.length; i++) {
            if (postData.likes[i] === userData.userId) {
                check = true;
                break;
            }
        }
        setLike(check);
    }, [postData,userData]);
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
    console.log(like);
    // console.log(postData);
    // console.log(userData);
    return (
        <>
            {
                like == true ?
                    <div className='Favourite-Icon like'>
                        <FavoriteIcon fontSize='large' onClick={handleLike} style={{
                            cursor: 'pointer'
                        }} />
                    </div> :
                    <div className='Favourite-Icon unlike'>
                        <FavoriteIcon fontSize='large' onClick={handleLike} style={{
                            cursor: 'pointer'
                        }} />
                    </div>
            }

        </>
    )
}

export default Like;
