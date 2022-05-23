import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import logo from '../Assets/logo.png';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';
export default function ImgMediaCard() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { resetpassword } = useContext(AuthContext);
    const resetPass = async () => {
        if (email === '') {
            setError("This is an error alert — check it out!");
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        } else {
            try {
                setLoading(true);
                await resetpassword(email);
            } catch (error) {
                setError("This is an error alert — check it out!");
                setTimeout(() => {
                    setError('');
                    setLoading(false);
                }, 2000);
            }
        }

    }
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "12rem"
        }}>
            <Card sx={{ maxWidth: 345 }} variant="outlined">
                <CardMedia
                    component="img"
                    height="200"
                    image={logo}
                    alt="My-Reel-App"
                />
                {error != "" && <Alert sx={{
                    maxWidth: 300,
                    marginLeft: 1
                }} severity="error">{error}</Alert>}
                <CardContent>
                    <TextField
                        value={email}
                        id="outlined-password-input"
                        label="Email"
                        type="email"
                        sx={{
                            width: 315
                        }}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <Button variant='contained' sx={{
                        marginLeft: 10,
                        marginTop: 1
                    }}
                        onClick={resetPass} disabled={loading}>Reset Password</Button>
                    {error==='' && loading!=false &&  <Typography
                    sx={{
                        marginTop:1,
                        marginLeft:9
                    }}>
                        Please Check Your Email
                    </Typography>}
                </CardContent>
                <CardActions>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: "3rem"
                    }}>
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
                </CardActions>
            </Card>
        </div>
    );
}
