"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header/Header'
import HeadTagElements from '@/components/HeadTagElements/HeadTagElements'
import { Box, CircularProgress } from '@mui/material'
import Image from 'next/image'
import Rating from 'react-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar as solidFaStar } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import './brandProfile.css'
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite'
import { db } from '@/firebase/firebaseConfig'

export default function page() {
    const params = useParams()
    const [loading, setloading] = useState(true)
    const [brandId, setbrandId] = useState('')

    const [rating, setRating] = useState(0)
    const [brandInfo, setBrandInfo] = useState(null)
    const [avgRating,setAvgRating] = useState(0)
    const [userData, setUserData] = useState({})
    const [allRatings, setAllRatings] = useState([])


    const preFetchUserInfo = async ()=>{
        const userDataFromLocalStorage = JSON.parse(localStorage.getItem('userData'));
        if (userDataFromLocalStorage) {
            const accountType = userDataFromLocalStorage.accountType;
            if (accountType === 'brand') {
              const tempUserData = {
                userRef:userDataFromLocalStorage.accountRef,
                username:userDataFromLocalStorage.brandInfo.brandTitle,
                userProfilePic: userDataFromLocalStorage.brandInfo.brandCover
              }
              setUserData(tempUserData)
            } else {
              const tempUserData = {
                userRef:userDataFromLocalStorage.accountRef,
                username:userDataFromLocalStorage.username,
                userProfilePic: userDataFromLocalStorage.profilePic
              }
              setUserData(tempUserData)
            }
        }
    }
    


    const doARating = async()=>{
        if(rating==0) return;
        try {
            const accountRef = doc(db, "accounts", params.brandid);
            const accountSnapshot = await getDoc(accountRef);
            const ratingArray = accountSnapshot.data().brandInfo.ratings;
        
            // Find the index of the userRef in the rating array
            const userIndex = ratingArray.findIndex((rating) => rating.userRef === userData.userRef);
        
            if (userIndex != -1) {
              // User has already rated, update the rating
              ratingArray[userIndex].rating = rating;
            } else {
              // User hasn't rated, add a new rating to the array
              ratingArray.push({ userRef:userData.userRef, rating: rating });
            }
        
            let tempbrandInfo = brandInfo.brandInfo
            tempbrandInfo.ratings=ratingArray

            setAllRatings(tempbrandInfo.ratings)
            
            await updateDoc(accountRef, {
                brandInfo: tempbrandInfo,
            });
        
            console.log('Rating updated successfully!');
          } catch (error) {
            console.error('Error updating rating:', error);
          }
    }

    const getImageUrlToShow = (image)=>{
        const storageBucket= "myoffer-de0b5.appspot.com"
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(image)}?alt=media`;
        return imageUrl
      }

    const calculateAvgRating = ()=>{
        let tempRating = 0
        allRatings.map((item)=>{
            tempRating = tempRating+item.rating
        })
        setAvgRating(tempRating/allRatings.length)
        console.log(allRatings)
    }

    const preFetchBrandInfo = async ()=>{
        setloading(true)
        const accountRef = doc(db, "accounts", params.brandid);
        getDoc(accountRef)
          .then((doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setBrandInfo(data)
                setAllRatings(data.brandInfo.ratings)
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
          setloading(false)
    }


    useEffect(() => {
        setbrandId(params.brandid)
        preFetchUserInfo()
        preFetchBrandInfo()
        
        doARating()
        calculateAvgRating()
    }, [params.brandid])
    
    useEffect(()=>{
        doARating()
        calculateAvgRating()
    },[allRatings,rating])

    return (
        <html lang="en">
            <HeadTagElements title="A Brand" />
            <body>
                <Header/>
                

                <Box sx={{width:'85%',backgroundColor:'#232324', display:'flex',justifyContent:'center',margin:'auto',marginTop:"5px",padding:'10px 20px',borderRadius:'12px',flexDirection:'column',marginBottom:'20px'}}>

                    {brandInfo==null?<CircularProgress style={{color:'white',margin:'auto'}} size={50}/>:
                    <>
                    <img src={brandInfo!=null && getImageUrlToShow(brandInfo['brandInfo'].brandCover)}  width={0} height={0} style={{ width: '70%', height: 'auto',borderRadius:'7px',margin:'auto' }}/>
                    
                    <Box sx={{display:'flex',justifyContent:'center',flexDirection:'row',alignItems:'center',marginTop:'10px'}}>
                        <h2 className='brandTitle'>{brandInfo!=null && brandInfo['brandInfo'].brandTitle}  &nbsp; </h2>
                        <Rating start={0} stop={5}
                        emptySymbol={<FontAwesomeIcon icon={faStar} style={{color:'yellow',fontSize:"35px"}}/>}     
                        fullSymbol={<FontAwesomeIcon icon={solidFaStar} style={{color:'yellow',fontSize:"35px"}}/>} initialRating={avgRating} readonly
                        />

                    </Box>

                    <p className='brandAboutText'>
                        {brandInfo!=null && brandInfo['brandInfo'].aboutText}
                    </p>

                    <Box sx={{display:'flex',justifyContent:'center',flexDirection:'row',alignItems:'center',marginTop:'10px',border:'1px solid white',width:'50%',padding:'20px',borderRadius:'10px',margin:'auto'}}>
                        <Rating 
                            start={0} stop={5}
                            emptySymbol={<FontAwesomeIcon icon={faStar} style={{color:'yellow',fontSize:"55px"}}/>}     
                            fullSymbol={<FontAwesomeIcon icon={solidFaStar} style={{color:'yellow',fontSize:"55px"}}/>}     
                            initialRating={rating}
                            onChange={(v)=>setRating(v)}
                        />
                    </Box>

                    </>
                    }
                </Box>

            </body>
        </html>
    )
}
