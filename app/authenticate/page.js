"use client"
import React, { useEffect, useState } from 'react';
import { Box, Container, Checkbox, FormControlLabel, Grid, TextField, Typography, RadioGroup, FormLabel, Radio, FormControl, Button } from '@mui/material';
import './authenticate.css'
import { auth, db } from '@/firebase/firebaseConfig';
import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite";
import { CircularProgress } from '@mui/material';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const LoginSignupComponent = () => {

    const router = useRouter()

    const accountsCollection = collection(db, "accounts");



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
    const [username, setusername] = useState('');
    const [brandName, setbrandName] = useState('');
    const [userNameErrorMessage, setuserNameErrorMessage] = useState(['',''])
    const [errorMessage, seterrorMessage] = useState('')
    const [latitude, setlatitude] = useState(0)
    const [longitude, setlongitude] = useState(0)

    

    const handleCoverPhotoChange = (event) => {
        const file = event.target.files[0];
        setCoverPhoto(file);
        setPreviewPhoto(URL.createObjectURL(file));
    };

    const checkUniqueUserName = async (e)=>{
        const val = e.target.value
        setusername(val.trim())
        if(val.length==0) {
            setuserNameErrorMessage(['','']); 
            return;
        }
        try {
            const q = query(accountsCollection, where("username", "==", val));
            const querySnapshot = await getDocs(q);
            const exists = !querySnapshot.empty;
        
            if (exists) {
              console.log("Username exists!");
              setuserNameErrorMessage(['red','Username already exists'])
            } else {
                
              setuserNameErrorMessage(['green','Username is unique'])
            }
        
            return exists;
          } catch (error) {
            console.error("Error checking username:", error);
            return false;
          }
    }


    const firebaseUpdateForSignUp = async ()=>{
        try{
            const docData = {
                accountType: userType === "brand" ? "brand" : "user",
                accountRef: "", // Placeholder for document ID, will be updated later
                brandInfo: userType === "brand" ? {
                  aboutText: aboutBrand,
                  brandCover: "2.jpg",
                  brandTitle: brandName,
                  ratings: []
                } : {},
                geoLocation:{
                    latitude:latitude,
                    longitude:longitude
                },
                email: email,
                profilePic: userType !== "brand" ? "avatar.png" : "",
                username: userType !== "brand" ? username: ""
              };
              const docRef = await addDoc(accountsCollection, docData);
              docData.accountRef = docRef.id;
              updateDoc(doc(db,"accounts",docRef.id),{"accountRef":docRef.id})
        }
        catch(e){
            alert(e.code)
        }
        
    }

    const navigationWorks = async ()=>{
        const q = query(accountsCollection, where("email", "==", logInemail));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
                
            const jsonData = JSON.stringify(userData);
            
            localStorage.setItem("userData", jsonData);

            const rememberMeValue = logInrememberMe==true ? "yes" : "no";
            localStorage.setItem("rememberMe", rememberMeValue);
        });
        router.replace('/')
    }


    const loginUser = async () => {
        setlogInLoading(true)
        try {
            setLogInEmail(logInemail.trim())
            const { user } =await signInWithEmailAndPassword(auth, logInemail, logInpassword);
            if(user.emailVerified){
                navigationWorks()
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


    const signUpUserOrBrand = async()=>{
        if(password != confirmPassword) return;
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            firebaseUpdateForSignUp()
            try {
                await sendEmailVerification(user);
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                setusername('')
                setbrandName('')
                alert('Email verification link sent successfully');
            }
            catch(e){
                alert("Something went wrong")
                // console.log(e)
            }
          } 
          catch (e) {
            if(e.code==='auth/email-already-in-use') seterrorMessage("Email has already been used")
            else if(e.code==='auth/weak-password') seterrorMessage("Password provide a strong password")
            else if(e.code === 'auth/invalid-email') seterrorMessage("Please provide a valid email")
            alert(errorMessage)
          }
    }

    const onSingUpPress = async ()=>{
        setsignUpLoading(true)
        if(email.length==0 || password.length == 0){
            seterrorMessage("Please provide all the necessarry informations")
            alert(errorMessage)
        }
        else if(email.length>0 && password.length>0 && confirmPassword.length>0) {
            if(password===confirmPassword) signUpUserOrBrand()
            else if(password!==confirmPassword) {
                seterrorMessage("Passwords do not match");
                alert(errorMessage)
            }
            // else seterrorMessage("Please provide a valid username")
        }
        else{
            seterrorMessage("Something is missing!")
            alert(errorMessage)
        }
        setsignUpLoading(false)
    }
    

    useEffect(() => {
        const checkIfRememberMeWasClicked = ()=>{
            const rememberMeValue = localStorage.getItem("rememberMe");
            if(rememberMeValue=='yes'){
                const userData = JSON.parse(localStorage.getItem('userData'));
                if (userData) {
                    const accountType = userData.accountType;
                    if (accountType === 'brand') {
                      router.replace('/createOffers');
                    } else {
                      router.replace('/');
                    }
                }
            }
        }
        checkIfRememberMeWasClicked()
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
                    <TextField id="email" label="Email" type="password" fullWidth variant="outlined" margin="normal" 
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
                    <TextField id="email" label="Email" type="email" fullWidth variant="outlined" margin="normal"
                        value={email} onChange={(e)=>setEmail(e.target.value)}
                    />
                    <TextField id="password" label="Password" type="password" fullWidth variant="outlined"
                        margin="normal" value={password}  onChange={(e)=>setPassword(e.target.value)}
                    />
                    <TextField
                        id="confirmPassword" label="Confirm Password" type="password" fullWidth variant="outlined"
                        margin="normal" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                    {userType === 'brand'?

                        <TextField
                            id="brandName" label="Brand name" type="text" fullWidth variant="outlined"
                            margin="normal" value={brandName} onChange={(e)=>setbrandName(e.target.value)}
                        />:
                        <TextField
                            id="userName" label="Username" type="text" fullWidth variant="outlined"
                            margin="normal" value={username} onChange={(e)=>checkUniqueUserName(e)}
                        />
                    }
                    {
                        userType !== 'brand' && userNameErrorMessage[1].length>0 && <span style={{color:userNameErrorMessage[0]}}>{userNameErrorMessage[1]}</span>
                    }
                    {userType === 'brands' && (
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
                    
                    <TextField id="aboutBrand" label="About Brand" type="number" fullWidth variant="outlined"
                        margin="normal"  value={aboutBrand} multiline={true}
                        onChange={(e)=>setAboutBrand(e.target.value)}
                        style={{ display: userType === 'customer' ? 'none' : 'block' }}
                    />
                    <TextField id="latitude" label="Latitude" type="number" fullWidth variant="outlined"
                        margin="normal"  value={latitude}
                        onChange={(e)=>setlatitude(e.target.value)}
                        style={{ display: userType === 'customer' ? 'none' : 'block' }}
                    />
                    <TextField id="longitude" label="Longitude" type='number' fullWidth variant="outlined"
                        margin="normal"  value={longitude}
                        onChange={(e)=> setlongitude(e.target.value)}
                        style={{ display: userType === 'customer' ? 'none' : 'block' }}
                    />
                    
                    <Box fullWidth style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
                        <Button style={{backgroundColor:'#FF5722',color:'white',width:'60%',margin:'auto',height:'45px'}} onClick={()=>onSingUpPress()}>
                        {
                            signUpLoading?<CircularProgress size={20} style={{color:'#fff'}}/>:"Sign Up"
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
