"use client"

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import HeadTagElements from '@/components/HeadTagElements/HeadTagElements'
import Header from '@/components/Header/Header'
import { Box, Button, TextField } from '@mui/material'
import Image from 'next/image'
import './profile.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import AComment from '@/components/OffersSectionWithATitle/AComment'
import { useState } from 'react'


export default function page() {  
  const params = useParams()

  const [commentText, setcommentText] = useState('')

  console.log(params.offerid)

  useEffect(() => {
    
  
  }, [])
  


  return (
    <html lang="en">
      <HeadTagElements title="An Offer" />
      <body>
          <Header/>

          <Box sx={{width:'85%',backgroundColor:'#232324', display:'flex',justifyContent:'center',margin:'auto',marginTop:"5px",padding:'20px',borderRadius:'12px',flexDirection:'column',marginBottom:'20px'}}>

          </Box>

      </body>
    </html>
  )
}
