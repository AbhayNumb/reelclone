import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import logo from '../Assets/logo.png';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Signup.css';
import { useContext } from 'react';
import { storage } from '../firebase';
import { database } from '../firebase';
import { AuthContext } from '../Context/AuthContext';
export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { signup } = useContext(AuthContext);
    const history = useHistory();
    const handleSignup = async () => {
        if (file == null) {
            setError("Please Upload Profile Image First");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }
        try {
            setError('');
            setLoading(true);
            let userObj = await signup(email, password);
            let uid = userObj.user.uid;
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
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
                    // console.log(url);
                    database.users.doc(uid).set({
                        email: email,
                        userId: uid,
                        fullname: name,
                        profileUrl: url,
                        createdAt: database.getTimeStamp()
                    })
                })
                setLoading(false);
                history.push('/');
            }
        } catch (error) {
            setError(error);
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }
    }
    return (
        <div className='SignupWrapper'>
            <div className='Signup-card'>
                <Card sx={{ maxWidth: 450 }} variant="outlined" className="Signup-Card">
                    <CardContent>
                        <CardMedia
                            component="img"
                            height="200"
                            image={logo}
                            alt="My-Reel-App"
                        />
                        <Typography variant="body2" color="text.secondary"
                            style={{
                                marginLeft: "26%"
                            }}>
                            Sign up to post and see reels
                        </Typography>

                        {error !== '' && <Alert severity="error" sx={{ maxWidth: 450 }}>{error}</Alert>}
                        <TextField
                            value={email}
                            margin="dense"
                            label="Email"
                            type="email"
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                            }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            value={password}
                            margin="dense"
                            label="Password"
                            type="password"
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            value={name}
                            margin="dense"
                            label="Full Name"
                            type="text"
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                            }}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </CardContent>
                    <div className='upload_Image'>
                        <div style={{
                            marginTop: "0.8rem"
                        }}>Profile</div>
                        <Fab color="secondary" aria-label="add"
                            component="label"
                        >
                            <input type='file' accept='image/' hidden style={{
                                position: "absolute",
                                height: "3.5rem",
                                width: "3.5rem",
                            }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <AddIcon />
                        </Fab >
                        <div style={{
                            marginTop: "0.8rem"
                        }}>Image</div>
                    </div>
                    <CardActions>
                        <Button sx={{ maxWidth: 450, marginTop: 0.7 }} variant="contained" size="normal" fullWidth={true} disabled={loading} onClick={handleSignup}>Sign Up</Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 450, marginTop: 1 }} variant="outlined">
                    <div className='signUpToSignin'>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Having an account?
                            </Typography>
                        </CardContent>
                        <Link to='/login'
                            style={{
                                marginTop: "0.87rem"
                            }}>
                            'Sign-In'
                        </Link>
                    </div>
                </Card>
            </div>
        </div>


    );
}
