import React, { useState } from 'react';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { database, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
export default function UploadVideo(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const uplVdo = async(file) => {
        console.log(file.size);
        setLoading(true);
        if (file === null) {
            setError("Please choose any file you want");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }
        if(file.size/(1024*1024)>100){
            setError('This video is very big');
            setTimeout(()=>{
                setError('')
            },2000);
            return;
        }
        let uid = uuidv4();
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
        uploadTask.on('state_changed', fn1, fn2, fn3);
        function fn1(snapshot) {
            if (snapshot.totalBytes !== 0) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} done.`)
            }

        }
        function fn2(error) {
            setError(error);
            setTimeout(() => {
                setError('')
            }, 2000);
            setLoading(false)
            return;
        }
        function fn3() {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                let obj = {
                    likes: [],
                    comments:[],
                    pUrl: url,
                    uName: props.user.fullname,
                    uproFile: props.user.profileUrl,
                    userId: props.user.userId,
                    createdAt: database.getTimeStamp()
                }
                database.posts.add(obj).then(async(ref) => {
                    let res = await database.users.doc(props.user.userId).update({
                         postIds:props.user.postIds!=null?[...props.user.postIds,ref.id]:[ref.id]
                    })
                }).then(()=>{
                    
                }).catch((err)=>{
                    
                })
            })
            setLoading(false);
        }
    }
    return (
        <>
            {
                error !== "" && <Alert sx={{
                    width: "17%",
                    marginLeft: "40vw",
                    height: "1.7rem"
                }} severity="error">{error}</Alert>
            }
            <div className='upload-vdo' style={{
                display:'flex',
                justifyContent:'center',
                marginTop:'0.5rem',
                marginBottom:'0.5rem'
            }}>
                <Button disabled={loading} variant="contained" sx={{
                    borderRadius: "0rem",
                    backgroundColor:'#0a3d62'
                }} component="label">
                    <input type='file' accept='video/' hidden style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                    }}
                        onChange={(e) => uplVdo(e.target.files[0])}
                    />
                    Upload Video
                </Button>
                {loading === true && <LinearProgress sx={{ width: '98.5%' }} />}
            </div>
        </>
    )
}
