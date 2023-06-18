"use client"

import React, { useEffect } from 'react'
import HeadTagElements from '@/components/HeadTagElements/HeadTagElements'
import Header from '@/components/Header/Header'
import { Box, CircularProgress, TextField } from '@mui/material'
import { useState } from 'react'
import { collection,  getDocs } from 'firebase/firestore/lite'
import { db } from '@/firebase/firebaseConfig'
import AnOffer from '@/components/OffersSectionWithATitle/AnOffer'
import './search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'


export default function page() {

    const [loading, setLoading] = useState(false)
    const [allOffers,setAllOffers] = useState([])
    const [offers,setOffers] = useState([])
    const [searchQuery, setsearchQuery] = useState('')

    const findObjectsWithSubstring = (arr, searchString) => {
        const searchLower = searchString.toLowerCase(); // Convert search string to lowercase
        
        return arr.filter((obj) => {
          for (const key in obj) {
            if (typeof obj[key] === 'string' && obj[key].toLowerCase().includes(searchLower)) {
              return true;
            }
          }
          return false;
        });
      };
      
    const searchForSomething = async ()=>{
        const querySnapshot = await getDocs(collection(db, 'offers'));
        const offersFromFirebase = querySnapshot.docs.map((doc) => doc.data());
        setAllOffers(offersFromFirebase)
    }

    const reModifySearchResult = ()=>{
        const tempOffersBySearchQuery = findObjectsWithSubstring(allOffers,searchQuery)
        console.log(tempOffersBySearchQuery)
        setOffers(tempOffersBySearchQuery)
    }

    const handleSearchQueryInputChange = (e)=>{
        setsearchQuery(e.target.value)
        reModifySearchResult()
    }

    useEffect(() => {
        setLoading(true)
        searchForSomething()
        setLoading(false)
    }, [])

    useEffect(() => {
        reModifySearchResult()
    }, [searchQuery])


  
  return (
    <html lang="en">
      <HeadTagElements title="Search offers" />
      <body>
          <Header/>

          <Box sx={{width:'85%',backgroundColor:'#232324', display:'flex',justifyContent:'center',margin:'auto',marginTop:"5px",padding:'20px',borderRadius:'12px',flexDirection:'column',marginBottom:'20px'}}>
            {loading ==true? 
            <CircularProgress style={{textAlign:'center',margin:'auto',color:'white'}} />
            :<>
                <TextField
                    id="Search" label="Search for anything" type="text" fullWidth variant="outlined"
                    margin="normal" value={searchQuery} onChange={(e) => {handleSearchQueryInputChange(e)}}
                    InputProps={{
                        style: { color: 'white', borderColor: 'white',},
                    }}
                    InputLabelProps={{ style: { color: 'white',borderColor: 'white'}, }}
                    />
             </>}
          </Box>
          {
            searchQuery.length>0 && offers.length>0 &&
            <Box className="offerSection">
                <h2 className='OfferCategoryTitle'><FontAwesomeIcon icon={faPaperclip} />&nbsp;&nbsp;{"Search Results"}</h2>
                <Box className="offerContainer">
                    {offers.map((offer) => (
                    <AnOffer offer= {offer}/>
                    ))}
                </Box>
            </Box>
          }

      </body>
    </html>
  )
}
