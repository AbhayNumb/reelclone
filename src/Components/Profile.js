import React from 'react'
import Bar from './Bar'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext, useState, useEffect } from 'react';
import VideoProfile from './VideoProfile';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Like from './Like';
import Comment from './Comment';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { AuthContext } from '../Context/AuthContext';
import { LinearProgress } from '@mui/material';
import { Avatar } from '@mui/material';
import ProfileLike from './ProfileLike';
import ProfileComment from './ProfileComment';
function Profile() {
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState(null);
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
            setUserData(snapshot.data());
        })
        return () => { unsub() }
    }, [user])
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
            // console.log(parr);
            // console.log(userData);
            parr = parr.filter((va) => va.userId === userData.userId);
            if (parr.length == 0) {
                setPost(null);
            } else {
                setPost(parr)
            }

        })
        return unsub
    }, [userData])
    // console.log(post);
    // console.log(userData);
    return (
        <>
            {
                userData == null ? <CircularProgress /> :
                    <>
                        <Bar />
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Card variant='outlined' sx={{
                                maxWidth: 345,
                                marginTop: '0.8rem',
                                height: '9rem'
                            }}>
                                <CardContent>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <Avatar src={userData.profileUrl} style={{
                                            height: '5rem',
                                            width: '5rem'
                                        }} />
                                        <Typography style={{
                                            fontSize: '1.5rem',
                                            marginLeft: '1rem'
                                        }}>{userData.fullname}</Typography>
                                    </div>
                                    <Typography style={{
                                        marginTop: '0.3rem',
                                        fontWeight: "bold",
                                        fontSize: '1.4rem',
                                    }}>Posts&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>
                                            {userData.postIds == null ? 0 : userData.postIds.length}
                                        </span></Typography>
                                </CardContent>
                            </Card>
                        </div>
                        <hr style={{
                            marginTop: '1rem', marginBottom: '3rem',
                            marginLeft: '10rem', marginRight: '10rem'
                        }}></hr>
                        <div>
                            {
                                post == null || userData == null ? <CircularProgress /> :
                                    <div style={{
                                        display: 'flex',
                                        marginLeft: '2rem',
                                        borderRadius: '0',
                                        flexWrap: 'wrap',
                                    }}>
                                        {
                                            post.map((p, index) => (
                                                <React.Fragment key={index}>
                                                    <div style={{
                                                        height: '20rem',
                                                        width: '15rem',
                                                    }}>
                                                        <VideoProfile src={p.pUrl} />
                                                        <div style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            gap: '6%'
                                                        }}>
                                                            <ProfileLike postData={p} userData={userData} />{p.likes.length}

                                                        </div>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                gap: '6%'
                                                            }}>
                                                            <ProfileComment postData={p} userData={userData} />{p.comments.length}

                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            ))
                                        }
                                    </div>
                            }
                        </div>
                    </>
            }
        </>
    )
}

export default Profile