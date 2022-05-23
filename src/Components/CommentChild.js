import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import { Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
function CommentChild({ postData }) {

    const [allComment, setAllComment] = useState(null);
    useEffect(async () => {
        let arr = [];
        for (let i = 0; i < postData.comments.length; i++) {
            let data = await database.comments.doc(postData.comments[i]).get();
            arr.push(data.data());
        }
        setAllComment(arr);
    }, [postData])
    const handleDelte = async (id) => {
        console.log(id);
        await database.comments.doc(id).delete();
        console.log(postData.postId);
        database.posts.onSnapshot(snapshot => (
            snapshot.docs.map((doc) => {
                if (doc.id===  postData.postId) {
                    console.log(doc.id);
                    console.log(doc.data());
                    let v = doc.data().comments;
                    v=v.filter(c=>c!=id);
                    console.log(v);
                    database.posts.doc(postData.postId).update({
                        comments:[...v]
                    })
                }

            })
        ))
    }
    return (
        <>
            {
                allComment === null ? <CircularProgress /> :
                    <>
                        {
                            allComment.map((com, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <div key={index} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.1rem',
                                    }}>
                                        <Avatar src={postData.uproFile} />
                                        <div style={{
                                            marginBottom: '0.3rem'
                                        }}>
                                            <p><span style={{
                                                fontWeight: 'bold'
                                            }}>{postData.uName}</span>&nbsp;{com.text}</p>
                                        </div>

                                    </div>
                                    <DeleteIcon style={{
                                        cursor: 'pointer'
                                    }} onClick={() => { handleDelte(com.cid) }} />
                                </div>
                            ))
                        }
                    </>
            }
        </>
    )
}

export default CommentChild;
