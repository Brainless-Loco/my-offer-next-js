"use client"

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header/Header'
import HeadTagElements from '@/components/HeadTagElements/HeadTagElements'
import { Box } from '@mui/material'
import Image from 'next/image'
import Rating from 'react-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar as solidFaStar } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import './brandProfile.css'

export default function page() {
    const params = useParams()

    const [rating, setRating] = useState(0)

    console.log(rating)

    return (
        <html lang="en">
            <HeadTagElements title="A Brand" />
            <body>
                <Header/>

                <Box sx={{width:'85%',backgroundColor:'#232324', display:'flex',justifyContent:'center',margin:'auto',marginTop:"5px",padding:'10px 20px',borderRadius:'12px',flexDirection:'column',marginBottom:'20px'}}>
                    <Image src={"/images/1.jpg"}  width={0} height={0} style={{ width: '70%', height: 'auto',borderRadius:'7px',margin:'auto' }}/>
                    
                    <Box sx={{display:'flex',justifyContent:'center',flexDirection:'row',alignItems:'center',marginTop:'10px'}}>
                        <h2 className='brandTitle'>Brand name  &nbsp; </h2>
                        <Rating 
                        start={0}
                        stop={5}
                        emptySymbol={<FontAwesomeIcon icon={faStar} style={{color:'yellow',fontSize:"35px"}}/>}     
                        fullSymbol={<FontAwesomeIcon icon={solidFaStar} style={{color:'yellow',fontSize:"35px"}}/>}     
                        initialRating={rating}
                        onChange={(v)=>setRating(v)}
                        // readonly
                        />

                    </Box>

                    <p className='brandAboutText'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
                    </p>

                    <Box sx={{display:'flex',justifyContent:'center',flexDirection:'row',alignItems:'center',marginTop:'10px',border:'1px solid white',width:'50%',padding:'20px',borderRadius:'10px',margin:'auto'}}>
                        <Rating 
                            start={0}
                            stop={5}
                            emptySymbol={<FontAwesomeIcon icon={faStar} style={{color:'yellow',fontSize:"55px"}}/>}     
                            fullSymbol={<FontAwesomeIcon icon={solidFaStar} style={{color:'yellow',fontSize:"55px"}}/>}     
                            initialRating={rating}
                            onChange={(v)=>setRating(v)}
                        />
                    </Box>

                    
                </Box>

            </body>
        </html>
    )
}
