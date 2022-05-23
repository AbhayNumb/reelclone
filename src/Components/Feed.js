import React from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import UploadVideo from './UploadVideo';
import Posts from './Posts';
import { database } from '../firebase';
import Bar from './Bar';
// import './Feed.css'
function Feed() {
    const { user} = useContext(AuthContext)
    const [userData, setUserData] = useState('')
    useEffect(() => {
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
            setUserData(snapshot.data())
        })
        return () => { unsub() }
    }, [user])
    return (
        <>
            <Bar userData={userData} style={{
                positon:'static'
            }} />
            <UploadVideo className='upVdo' user={userData} />
            <Posts user={userData} />
        </>
    );
}

export default Feed;
