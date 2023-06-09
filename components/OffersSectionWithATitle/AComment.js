import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function AComment() {
  return (
    <Box sx={{display:'flex',flexDirection:'row',marginY:'12px'}}>
        <Box sx={{width:'5%',marginRight:'20px'}}>
            <Image src={'/avatar.png'} width={0} height={0} style={{ width: '100%', height: 'auto',borderRadius:'50%',marginTop:'5px' }}/>
        </Box>
        <Box sx={{width:'92%'}}>
            <span style={{fontSize:'17px',fontWeight:'500',}}>userName dada</span>
            <span style={{marginLeft:'10px',fontSize:'11px',fontWeight:'400',}}>20th July, 2020</span>
            <p className='commentText'>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            </p>
        </Box>
        
    </Box>
  )
}
