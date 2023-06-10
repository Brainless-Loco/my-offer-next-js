"use client"

import React, { useEffect, useState } from 'react';
import { Box, Container, Checkbox, FormControlLabel, Grid, TextField, Typography, RadioGroup, FormLabel, Radio, FormControl, Button } from '@mui/material';
import './authenticate.css'
import { auth, db } from '@/firebase/firebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { CircularProgress } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginSignupComponent = () => {

    const [logInLoading, setlogInLoading] = useState(false)
    const [signUpLoading, setsignUpLoading] = useState(false)


    //log in
    const [logInemail, setLogInEmail] = useState('');
    const [logInpassword, setLogInPassword] = useState('');
    const [logInrememberMe, setLogInRememberMe] = useState(false);
    const [anErrorWhileLogIn, setAnErrorWhileLogIn] = useState(false)
    const [logInErroMessage, setlogInErroMessage] = useState('')




    //sign up
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [aboutBrand, setAboutBrand] = useState('');
    const [userType, setUserType] = useState('brand');
    const [previewPhoto, setPreviewPhoto] = useState(null);

    

    const handleCoverPhotoChange = (event) => {
        const file = event.target.files[0];
        setCoverPhoto(file);
        setPreviewPhoto(URL.createObjectURL(file));
    };



    const loginUser = async () => {
        setlogInLoading(true)
        try {
            setLogInEmail(logInemail.trim())
            const { user } =await signInWithEmailAndPassword(auth, logInemail, logInpassword);
            if(user.emailVerified){
                // const usersRef = collection(db, "users");
                // const q = query(usersRef, where("email", "==", logInemail));
                // const querySnapshot = await getDocs(q);
                // querySnapshot.forEach((doc) => {
                //     const userData = doc.data();
                //     const {userName,user_id,email,dp_url}=userData
                //     const loggedUserInfo = {
                //         userRef:user_id,
                //         userEmail:email,
                //         userName:userName,
                //         userProfilePic:dp_url
                //     }
                // });
            }
            else{
                alert("Please verify your email first.")
            }
            // setloading(false)
        } 
        catch (e) {
            if(e.code==='auth/wrong-password') setlogInErroMessage("***Wrong Password***")
            if(e.code==='auth/user-not-found') setlogInErroMessage('***No account matches this email***')
            else console.log(e)

            console.log(e)
        }
        
        setlogInLoading(false)
      };
    

    useEffect(() => {
        
    }, [])


    return (
        <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: 'auto',alignItems:'center',overflowY:'auto',paddingY:'50px'}}>
            <Grid container spacing={2}>
            <Grid style={{width:'45%',margin:'auto'}} item >
                <Box sx={{ bgcolor: 'background.default', p: 4 , borderRadius:'10px'}}>
                    <Typography variant="h4" color="#FF5722" gutterBottom>
                        Log In
                    </Typography>
                    <TextField id="email" label="Email" type="email" fullWidth variant="outlined" margin="normal" 
                    value={logInemail} onChange={(e)=>setLogInEmail(e.target.value)} />
                    <TextField id="email" label="Email" type="email" fullWidth variant="outlined" margin="normal" 
                    value={logInpassword} onChange={(e)=>setLogInPassword(e.target.value)} />
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Remember me"
                        style={{ color: 'black' }}
                        checked={logInrememberMe}
                        onChange={(e)=>setLogInRememberMe(e.target.checked)}
                    />
                    <Box>
                        <span style={{color:'red',fontWeight:'500'}}>{logInErroMessage}</span>
                    </Box>
                    <Box fullWidth style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
                        <Button style={{backgroundColor:'#FF5722',color:'white',width:'60%',margin:'auto',height:'45px'}} onClick={()=>loginUser()}
                        >
                        {
                            logInLoading?<CircularProgress size={20} style={{color:'#fff'}}/>:"Log In"
                        }
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid style={{width:'45%',margin:'auto'}} item>
                <Box sx={{ bgcolor: 'background.default', p: 4, borderRadius: '10px', }}>
                    <Typography variant="h4" color="#FF5722" gutterBottom>
                        Sign Up
                    </Typography>
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <TextField id="password" label="Password" type="password" fullWidth variant="outlined"
                        margin="normal" value={password}  onChange={(e)=>setPassword(e.target.value)}
                    />
                    <TextField
                        id="confirmPassword" label="Confirm Password" type="password" fullWidth variant="outlined"
                        margin="normal" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                    {userType === 'brand' && (
                        <>
                        <input
                            accept="image/*"
                            id="coverPhoto"
                            type="file"
                            onChange={handleCoverPhotoChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="coverPhoto">
                            <Button variant="contained" component="span" fullWidth>
                            {coverPhoto ? 'Change Image' : 'Upload Image'}
                            </Button>
                        </label>
                        {previewPhoto && (
                            <img src={previewPhoto} alt="Uploaded Cover" style={{ width: '50%', marginTop: '16px',margin:'auto' }} />
                        )}
                        </>
                    )}
                    
                    <TextField id="aboutBrand" label="About Brand" type="text" fullWidth variant="outlined"
                        margin="normal"  value={aboutBrand}
                        onChange={(e)=>setAboutBrand(e.target.value)}
                        style={{ display: userType === 'customer' ? 'none' : 'block' }}
                    />
                    <FormControl component="fieldset" style={{ marginTop: '16px' }}>
                        <RadioGroup row value={userType} onChange={(e) => setUserType(e.target.value)}>
                            <FormControlLabel
                                value="brand"
                                control={<Radio />}
                                label="Brand"
                                sx={{ color: 'black', fontWeight: 500 }}
                            />
                            <FormControlLabel
                                value="customer"
                                control={<Radio />}
                                label="Customer"
                                sx={{ color: 'black', fontWeight: 500 }}
                            />
                        </RadioGroup>

                    </FormControl>
                    <Box fullWidth style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
                        <Button style={{backgroundColor:'#FF5722',color:'white',width:'60%',margin:'auto',height:'45px'}} onClick={()=>setlogInLoading(true)}>
                        {
                            signUpLoading?<CircularProgress size={20} style={{color:'#fff'}}/>:"Log In"
                        }
                        </Button>
                    </Box>
                </Box>
            </Grid>
            </Grid>
        </Box>
        </Container>
    );
};

export default LoginSignupComponent;
