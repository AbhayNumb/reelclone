import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import CommentChild from './CommentChild';
import { useTheme } from '@mui/material/styles';
import Input from '@mui/material/Input';
import MessageIcon from '@mui/icons-material/Message';
import './Comment.css';
import { database } from '../firebase';
export default function Comment({ userData, postData }) {
    const [text, setText] = useState('');
    const [open, setOpen] = React.useState(null);
    const theme = useTheme();
    const ariaLabel = { 'aria-label': 'description' };
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = (id) => {
        setOpen(id);
    };
    const handleClose = () => {
        setOpen(null);
    };
    const handleClick = () => {
        if (text === '') {
            return
        }
        let obj = {
            text: text,
            uProfileImage: userData.profileUrl,
            uName: userData.fullname,
            cid: ''
        }
        database.comments.add(obj)
            .then((doc) => {
                let val = doc.path.slice(9);
                database.comments.doc(val).update({
                    cid: val
                })
                return doc;
            })
            .then((doc) => {
                database.posts.doc(postData.postId).update({
                    comments: [...postData.comments, doc.id]
                })
            })
        setText('');
    }
    return (
        <>
            <div className='comm-cont'>
                <MessageIcon fontSize='large' 
                    onClick={() => handleClickOpen(postData.postId)}
                />
            </div>
            <Dialog
                open={open !== null}
                onClose={handleClose}
                fullScreen={fullScreen}
                aria-labelledby="responsive-dialog-title"
                maxWidth="lg"
            >
                <div style={{
                    display: 'flex',
                    width: '100%',
                    overflow: 'hidden'
                }}>
                    <div className='modal-video' style={{
                        width: '50%',
                    }}>
                        <video src={postData.pUrl} style={{
                            // width: '70%',
                            width: '100%',
                            height: "100%",
                            objectFit: 'cover'

                        }}></video>
                    </div>
                    <div style={{
                        width: '50%',
                    }}>
                        <Card variant="outlined"
                            style={{
                                width: '100%',
                                height: "94%",
                                objectFit: 'cover'
                            }}>
                            <CommentChild postData={postData} />
                        </Card>
                        <div>
                            <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add Comments..." inputProps={ariaLabel}
                                style={{
                                    width: '72.5%',
                                    marginTop: '0.3rem'
                                }} />
                            <Button variant="contained" style={{
                                height: '2.rem',
                                marginBottom: '0.3rem',
                                borderRadius: 'none'
                            }} onClick={handleClick} >Add Comment</Button>
                        </div>
                    </div>
                </div>

            </Dialog>
        </>
    )
}
