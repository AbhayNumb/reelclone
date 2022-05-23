import * as React from 'react';
import Card from '@mui/material/Card';
import { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import logo from '../Assets/logo.png';
import { Link, useHistory } from 'react-router-dom';
import mobile from '../Assets/mobile.png';
import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import img1 from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';
import img5 from '../Assets/img5.jpg';
import { useContext } from 'react';
import './Login.css';
import { AuthContext } from '../Context/AuthContext';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const handleLogin = async () => {
        try {
            setError("");
            setLoading(true);
            await login(email, password);
            setLoading(false);
            history.push('/');
        } catch (error) {
            setError("Please enter Valid Credentials");
            setTimeout(() => {
                setError('')
            }, 2000);
            setLoading(false);
        }
    }
    return (
        <div className='LoginWrapper'>
            <div className='caraousal-card'
                style={{
                    marginLeft: "5rem",
                    marginTop: '4rem'
                }}><div className='slider-cont'>
                    <div className='slider'>
                        <CarouselProvider
                            naturalSlideWidth={2}
                            naturalSlideHeight={3.5}
                            totalSlides={5}
                            hasMasterSpinner={false}
                            isPlaying={true}
                            touchEnabled={false}
                            dragEnabled={false}
                            interval={1500}
                            visibleSlides={1}
                            infinite={true}
                            isIntrinsicHeight={false}
                        >
                            <Slider>
                                <Slide index={0}><Image src={img1} /></Slide>
                                <Slide index={1}><Image src={img2} /></Slide>
                                <Slide index={2}><Image src={img3} /></Slide>
                                <Slide index={3}><Image src={img4} /></Slide>
                                <Slide index={4}><Image src={img5} /></Slide>
                            </Slider>
                        </CarouselProvider>
                    </div>
                </div>
                <Card sx={{ maxWidth: 450 }} variant="none" className="Signup-Card">
                    <CardContent>
                        <CardMedia
                            component="img"
                            height="550"
                            image={mobile}
                            alt="My-Reel-App"
                        />


                    </CardContent>
                </Card>

            </div>
            <div className='Login'>
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
                            Login to post and see reels
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
                        <div style={{
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            gap:"1rem",
                            marginTop:"0.5rem"
                        }}>
                        <Typography variant="body2" color="text.secondary">
                            Forgot Password?
                        </Typography>
                        <Link to='/resetpassword'>
                            Reset Password
                        </Link>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button sx={{ maxWidth: 450, marginTop: 0.02 }} variant="contained" size="normal" fullWidth={true} disabled={loading} onClick={handleLogin} >Log in</Button>
                    </CardActions>
                </Card>
                <Card>
                    <div className='signUpToSignin'>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Don't have an account?
                            </Typography>
                        </CardContent>
                        <Link to='/signup'
                            style={{
                                marginTop: "0.87rem"
                            }}>
                            Sign-Up
                        </Link>
                    </div>
                </Card>
            </div>
        </div >

    );
}
