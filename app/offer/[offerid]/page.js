"use client"

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import HeadTagElements from '@/components/HeadTagElements/HeadTagElements'
import Header from '@/components/Header/Header'
import { Box, Button, CircularProgress, TextField } from '@mui/material'
import Image from 'next/image'
import './offerPage.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import AComment from '@/components/OffersSectionWithATitle/AComment'
import { useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite'
import { db } from '@/firebase/firebaseConfig'


export default function page() {
  
  const params = useParams()
  const {offerid} = params
  
  const offerRef = doc(db, 'offers', offerid);


  const [loading, setLoading] = useState(false)

  const [commentText, setcommentText] = useState('')
  const [offer,setOffer] = useState({})
  const [userData, setUserData] = useState({})
  const [likes, setlikes] = useState([])
  const [dislikes, setdislikes] = useState([])
  const [comments, setComments] = useState([])


  const getImageUrlToShow = (image)=>{
    const storageBucket= "myoffer-de0b5.appspot.com"
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(image)}?alt=media`;
    return imageUrl
  }

  const getOrdinalSuffix = (day) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const relevantDigits = (day > 3 && day < 21) || day % 10 > 3 ? 0 : day % 10;
    return day + (suffixes[relevantDigits] || 'th');
  }

  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    const timeString = dateObj.toLocaleTimeString('en-US', options);
  
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
  
    const formattedDate = `${timeString}, ${getOrdinalSuffix(day)} ${month}, ${year}`;
  
    return formattedDate;
  };

  const preFetchUserInfo = async ()=>{
      const userDataFromLocalStorage = JSON.parse(localStorage.getItem('userData'));
      // console.log(userDataFromLocalStorage)
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

  const preFetchOfferData = async ()=>{
    setLoading(true)
    try {
      const offerDoc = await getDoc(offerRef);
      if (offerDoc.exists()) {
        const offerData = offerDoc.data(); 
        setOffer(offerData)
        setlikes(offerData.likes)
        setdislikes(offerData.dislikes)
        setComments(offerData.comments)
      } else {
        console.log('Offer not found');
      }
    } catch (error) {
      console.error('Error getting offer:', error);
    }
    setLoading(false)
  }


  const doAComment = async()=>{
    if(commentText.length==0) return;
      const tempCommentInfo = {
        username:userData.username,
        userProfilePic:userData.userProfilePic,
        comment:commentText.trim(),
        commentTime:new Date()
      }
      setComments([...comments,tempCommentInfo])
      await updateDoc(offerRef, { comments: [...comments,tempCommentInfo] });
      setcommentText('')
  }

  const doAFirebaseLikeDislikeUpdate = ()=>{
    updateDoc(offerRef, { likes: likes, dislikes: dislikes });
  }

  const firebaseIfElseUpdate = (likeOrDisLike)=>{
    if(likeOrDisLike=='like'){
      if(likes.includes(userData.userRef)==true){ //undo like
        const tempLikes = likes.filter(x => x != userData.userRef);
        setlikes(tempLikes)
      }
      else{ ///like the offer
        const tempLikes = [...likes,userData.userRef]
        setlikes(tempLikes)

        const tempDislikes = dislikes.filter(x => x != userData.userRef)
        setdislikes(tempDislikes)
      }
    }
    else{
      if(dislikes.includes(userData.userRef)==true){ //undo dislike
        const tempDislikes = dislikes.filter(x => x != userData.userRef);
        setdislikes(tempDislikes)
      }
      else{
        const tempDislikes = [...dislikes,userData.userRef]
        setdislikes(tempDislikes)

        const tempLikes = likes.filter(x => x != userData.userRef)
        setlikes(tempLikes)
      }
    }
    return 'okay'
  }

  const doLikeOrDisLikeOrUndo = (likeOrDisLike)=>{
    try{
      firebaseIfElseUpdate(likeOrDisLike)
    }
    catch(e){
      console.log(e)
    }
  }

  console.log(likes)


  useEffect(() => {
    preFetchOfferData()
    preFetchUserInfo()
  }, [])
  
  useEffect(()=>{
    doAFirebaseLikeDislikeUpdate();
  },[likes,dislikes])


  return (
    <html lang="en">
      <HeadTagElements title="An Offer" />
      <body>
          <Header/>

          <Box sx={{width:'85%',backgroundColor:'#232324', display:'flex',justifyContent:'center',margin:'auto',marginTop:"5px",padding:'20px',borderRadius:'12px',flexDirection:'column',marginBottom:'20px'}}>
            {loading ==true? 
            <CircularProgress style={{textAlign:'center',margin:'auto',color:'white'}} />
            :<>
              <img src={getImageUrlToShow(offer.offerCover)}  width={0} height={0} style={{ width: '70%', height: 'auto',borderRadius:'7px',margin:'auto' }}/>
              <Box style={{width:'100%'}}>  
                <h2 className='offerTitle'>{offer.offerTitle}</h2>
                <h2 className='offerCampaignDate'>[ {offer.startDate} ~ {offer.endDate} ]</h2>
                <Link style={{color:'cyan',fontSize:'20px',fontWeight:'600'}} href={"brand/"+offer.accountRef}>{offer.brandTitle}</Link>
                <span style={{fontSize:'small',textAlign:'center'}}> &nbsp;&nbsp; - &nbsp; {formatDate(offer.postDate)}</span>
                <Box className='offerDescription' dangerouslySetInnerHTML={{__html:offer.offerDescription}}>
                  {/* {offer.offerDescription} */}
                </Box>
              </Box>
              <Box style={{width:'100%',borderRadius:'5px',border:'1px solid #fff',height:"auto",marginTop:'15px',display:'flex',justifyContent:'space-around',alignItems:'center',padding:'10px'}}>

                <Button onClick={()=>{doLikeOrDisLikeOrUndo('like');}} style={{width:'30%',height:'50px',borderRadius:'5px',fontSize:'20px',color:'white'}}>
                  <FontAwesomeIcon icon={faThumbsUp} style={{fontSize:'30px',color: likes.includes(userData.userRef)? 'blue':'white'}}/>&nbsp;({likes.length})
                </Button>

                <Button onClick={()=>{doLikeOrDisLikeOrUndo('dislike'); }} style={{width:'30%',height:'50px',borderRadius:'5px',fontSize:'20px',color:'white'}}>
                  {/* <FontAwesomeIcon icon={faThumbsDown} style={{fontSize:'30px'}}/> */}
                  <FontAwesomeIcon icon={faThumbsDown} style={{fontSize:'30px',color:dislikes.includes(userData.userRef)? 'red':'white'}}/>&nbsp;({dislikes.length})
                </Button>

                <Button disabled style={{width:'30%',height:'50px',borderRadius:'5px',fontSize:'20px',color:'white'}}>
                  <FontAwesomeIcon icon={faComment} style={{fontSize:'30px',color:'white'}}/>&nbsp;({comments.length})
                </Button>

              </Box>
              <Box style={{width:'100%',borderRadius:'5px',border:'1px solid #fff',height:"auto",marginTop:'15px',padding:'10px 20px'}}>

                {comments.map((item)=>{
                  return <AComment commentInfo={item}/>
                })}

                {/* <AComment commentInfo={}/> */}

                <Box sx={{textAlign:'center',marginTop:'10px',position:'relative'}}>

                  <TextField sx={{color:'white',border:'1px solid white',borderRadius:'8px',width:'99%',margin:'auto',}} placeholder='Write a Comment' value={commentText} 
                    onChange={(e)=> setcommentText(e.target.value)}
                    inputProps={{style:{color:'#fff'}}}
                    multiline={true}

                  ></TextField>
                  <Button onClick={doAComment} style={{position:'absolute', right:'5px',top:'0px',width:'100px',height:'100%'}}><FontAwesomeIcon style={{fontSize:'28px',color:'white',}} icon={faPaperPlane} /></Button>
                </Box>
              </Box>
              </>}
          </Box>

      </body>
    </html>
  )
}
