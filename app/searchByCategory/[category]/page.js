"use client"

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import HeadTagElements from '@/components/HeadTagElements/HeadTagElements'
import Header from '@/components/Header/Header'
import { Box, CircularProgress, } from '@mui/material'
import { useState } from 'react'
import { collection,  getDocs } from 'firebase/firestore/lite'
import { db } from '@/firebase/firebaseConfig'
import AnOffer from '@/components/OffersSectionWithATitle/AnOffer'
import './searchByCategory.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'


export default function page() {
  
    const params = useParams()
  

    const [loading, setLoading] = useState(false)
    const [allOffers,setAllOffers] = useState([])
    const [offers,setOffers] = useState([])
    const [category, setcategory] = useState('')

    const findObjectsWithSubstring = (arr) => {
        const searchLower = category.toLowerCase();
        console.log(searchLower)
        const temp =  arr.filter((obj) => {
            if(obj['category'].toLowerCase().includes(searchLower)) return true;
            else return false;
          })
        console.log(temp)
        return temp
      };
      
    const searchForSomething = async ()=>{
        const querySnapshot = await getDocs(collection(db, 'offers'));
        const offersFromFirebase = querySnapshot.docs.map((doc) => doc.data());
        setAllOffers(offersFromFirebase)
        const tempOffersBySearchQuery = findObjectsWithSubstring(offersFromFirebase)
        setOffers(tempOffersBySearchQuery)
    }

    useEffect(() => {
      setcategory(params.category)
      if(category.length>0){
        setLoading(true)
        searchForSomething()
        setLoading(false)
      }
    }, [category])

  
  return (
    <html lang="en">
      <HeadTagElements title={"An Offer"} />
      <body>
          <Header/>

         {loading ==true && <Box sx={{width:'85%',backgroundColor:'#232324', display:'flex',justifyContent:'center',margin:'auto',marginTop:"5px",padding:'20px',borderRadius:'12px',flexDirection:'column',marginBottom:'20px'}}>
             <CircularProgress style={{textAlign:'center',margin:'auto',color:'white'}} />
          </Box>
          }
          {
            loading==false && offers.length>0 &&
            <Box className="offerSection">
                <h2 className='OfferCategoryTitle'><FontAwesomeIcon icon={faPaperclip} />&nbsp;&nbsp;{"Offers on "+category}</h2>
                <Box className="offerContainer">
                    {offers.map((offer) => (
                    <AnOffer key={offer.offerRef} offer= {offer}/>
                    ))}
                </Box>
            </Box>
          }

      </body>
    </html>
  )
}
