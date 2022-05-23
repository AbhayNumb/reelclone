import React, { useContext, useEffect, useState } from 'react';
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from '../Components/Video';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Like from './Like';
import Comment from './Comment';
import './Post.css'
export default function Posts(props) {
    const [post, setPost] = useState(null);
    const callback = (entries) => {
        entries.forEach((entry) => {
            let ele = entry.target.childNodes[0]
            ele.play().then(() => {
                if (!ele.paused && !entry.isIntersecting) {
                    ele.pause()
                }
            })
        })
    }
    let observer = new IntersectionObserver(callback, { threshold: 0.6 });
    useEffect(() => {
        const elements = document.querySelectorAll(".video")
        elements.forEach((element) => {
            observer.observe(element)
        })
        return () => {
            observer.disconnect();
        }
    }, [post])
    useEffect(() => {
        let parr = []
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            parr = []
            querySnapshot.forEach((doc) => {
                let data = {
                    ...doc.data(),
                    postId: doc.id
                }
                parr.push(data);
            })
            setPost(parr)
        })
        return unsub
    }, [])
    return (
        <>
            <div>
                {
                    post == null || props.user == null ? <CircularProgress /> :
                        <div className='video-container'>
                            {
                                post.map((p, index) => (
                                    <React.Fragment key={index}>
                                        <div className='video' style={{
                                            position: 'relative'
                                        }}>
                                            <Video src={p.pUrl} />
                                            <Like userData={props.user} postData={post[index]} />
                                            <Comment userData={props.user} postData={post[index]} />
                                            <div className='pfp-cont' style={{
                                                position: 'absolute',
                                                bottom: '2rem',
                                                left: '41vw',
                                                display: "flex",
                                                alignItems: "center",
                                                gap: '0.7rem'
                                            }}>
                                                <Avatar className='profPic' variant="circular" alt="Remy Sharp" src={props.user.profileUrl} />
                                                <Typography variant="body2" gutterBottom sx={{
                                                    color: "white",
                                                    marginTop: "0.6rem",
                                                    fontFamily: ' Tahoma',
                                                }}>{props.user.fullname}
                                                </Typography>
                                            </div >
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                        </div>
                }
            </div>
        </>
    )
}
