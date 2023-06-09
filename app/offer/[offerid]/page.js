"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import HeadTagElements from '@/components/HeadTagElements/HeadTagElements'
import Header from '@/components/Header/Header'
import { Box, Button, TextField } from '@mui/material'
import Image from 'next/image'
import './offerPage.css'
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


  return (
    <html lang="en">
      <HeadTagElements title="An Offer" />
      <body>
          <Header/>

          <Box sx={{width:'85%',backgroundColor:'#232324', display:'flex',justifyContent:'center',margin:'auto',marginTop:"5px",padding:'20px',borderRadius:'12px',flexDirection:'column',marginBottom:'20px'}}>

              <Image src={"/images/1.jpg"}  width={0} height={0} style={{ width: '70%', height: 'auto',borderRadius:'7px',margin:'auto' }}/>
              <Box style={{width:'100%'}}>  
                <h2 className='offerTitle'>70% sale on something to something</h2>
                <h2 className='offerCampaignDate'>[ 23th July, 2023 ~ 24th July 2023 ]</h2>
                <Link style={{color:'cyan',fontSize:'20px',fontWeight:'600'}} href={"/"}>Brand Name</Link>
                <span style={{fontSize:'small',textAlign:'center'}}> &nbsp;&nbsp; - &nbsp; 20th July, 2023</span>
                <p className='offerDescription'>
                  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                </p>
              </Box>
              <Box style={{width:'100%',borderRadius:'5px',border:'1px solid #fff',height:"auto",marginTop:'15px',display:'flex',justifyContent:'space-around',alignItems:'center',padding:'10px'}}>
                <Button  style={{width:'30%',height:'50px',borderRadius:'5px',fontSize:'20px',color:'white'}}>
                  <FontAwesomeIcon icon={faThumbsUp} style={{fontSize:'30px',color:'blue'}}/>&nbsp;(25)
                </Button>
                <Button  style={{width:'30%',height:'50px',borderRadius:'5px',fontSize:'20px',color:'white'}}>
                  {/* <FontAwesomeIcon icon={faThumbsDown} style={{fontSize:'30px'}}/> */}
                  <FontAwesomeIcon icon={faThumbsDown} style={{fontSize:'30px',color:'red'}}/>&nbsp;(25)
                </Button>
                <Button disabled style={{width:'30%',height:'50px',borderRadius:'5px',fontSize:'20px',color:'white'}}>
                  <FontAwesomeIcon icon={faComment} style={{fontSize:'30px',color:'white'}}/>&nbsp;(25)
                </Button>
              </Box>
              <Box style={{width:'100%',borderRadius:'5px',border:'1px solid #fff',height:"auto",marginTop:'15px',padding:'10px 20px'}}>
                <AComment/>
                
                <AComment/>
                
                <AComment/>

                <Box sx={{textAlign:'center',marginTop:'10px',position:'relative'}}>

                  <TextField sx={{color:'white',border:'1px solid white',borderRadius:'8px',width:'99%',margin:'auto',}} placeholder='Write a Comment' value={commentText} 
                    onChange={(e)=> setcommentText(e.target.value)}
                    inputProps={{style:{color:'#fff'}}}

                  ></TextField>
                  <Button style={{position:'absolute', right:'15px',top:'0px',width:'100px',height:'55px'}}><FontAwesomeIcon style={{fontSize:'28px',color:'white',}} icon={faPaperPlane} /></Button>
                </Box>
              </Box>
              <Box>
              </Box>
          </Box>

      </body>
    </html>
  )
}
