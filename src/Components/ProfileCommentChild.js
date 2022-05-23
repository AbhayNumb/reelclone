import React, { useEffect } from 'react'
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress, Input } from '@mui/material';
import { database } from '../firebase';
import { Avatar } from '@mui/material';
function ProfileCommentChild({ postData, userData }) {
    const deleteCommen=async(id)=>{
        console.log(id);
        await database.comments.doc(id).delete();
        database.posts.onSnapshot(snapShot=>(
            snapShot.docs.map((doc)=>{
                if(doc.id===postData.postId){
                    let v=doc.data().comments;
                    v=v.filter(c=>c!=id);
                    database.posts.doc(postData.postId).update({
                        comments:[...v]
                    })
                }
            })
        ))
    }
    const addComment = () => {
        console.log("Hi");
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

    const [text, setText] = useState('')
    const [allComment, setAllComment] = useState(null);
    console.log(postData);
    console.log(userData);
    console.log(allComment);
    useEffect(async () => {
        let arr = [];
        for (let i = 0; i < postData.comments.length; i++) {
            let data = await database.comments.doc(postData.comments[i]).get();
            arr.push(data.data());
        }
        setAllComment(arr);
    }, [postData])
    return (
        <>
            <Card sx={{ maxWidth: 300 }} >
                <CardContent>
                    {
                        allComment == null ? <CircularProgress /> :
                            allComment.length === 0 ?
                                <Typography> No Comments </Typography>
                                :
                                allComment.map((val,index) => (
                                    <div style={{
                                        paddingBottom: '1rem',
                                        display:'flex',
                                        justifyContent:'space-between'
                                    }} key={index}>
                                        <div style={{
                                            display: 'flex',
                                            gap: '0.6rem',
                                            alignItems: 'center'
                                        }}>
                                            <Avatar src={val.uProfileImage} />
                                            <div style={{
                                                fontWeight: 'bold'
                                            }}>{userData.fullname}</div>
                                            {val.text}
                                        </div>
                                        <div style={{
                                            marginTop:'0.7rem',
                                            marginLeft:'1rem',
                                            cursor:'pointer'
                                        }}>
                                            <DeleteIcon onClick={()=>deleteCommen(val.cid)}/>
                                        </div>

                                    </div>
                                ))
                    }
                </CardContent>
            </Card>
            <div style={{
                display: 'flex'
            }}>
                <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add Comments..."
                    style={{
                        width: '100%',
                        marginTop: '0.3rem'
                    }} />
                <Button variant="contained" onClick={addComment} style={{
                    height: '2.rem',
                    marginTop: '0.3rem',
                    borderRadius: 'none'
                }} >Add </Button>
            </div>
        </>
    )
}

export default ProfileCommentChild