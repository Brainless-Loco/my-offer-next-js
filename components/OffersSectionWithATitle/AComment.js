import { Box } from '@mui/material'
import React from 'react'

export default function AComment(props) {

  const {userRef,username,userProfilePic,comment,commentTime} = props.commentInfo
  // console.log(commentTime)

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



  return (
    <Box sx={{display:'flex',flexDirection:'row',marginY:'12px'}}>
        <Box sx={{width:'5%',marginRight:'20px'}}>
            <img src={getImageUrlToShow(userProfilePic)} width={0} height={0} style={{ width: '100%', height: 'auto',borderRadius:'50%',marginTop:'5px' }}/>
        </Box>
        <Box sx={{width:'92%'}}>
            <span style={{fontSize:'17px',fontWeight:'500',}}>{username}</span>
            <span style={{marginLeft:'10px',fontSize:'11px',fontWeight:'400',}}>{formatDate(commentTime)}</span>
            <p className='commentText'>{comment}</p>
        </Box>
        
    </Box>
  )
}
