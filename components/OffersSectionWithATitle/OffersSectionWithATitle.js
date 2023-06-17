"use client"

import React, { useEffect, useState } from 'react';
import './Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import AnOffer from './AnOffer';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '@/firebase/firebaseConfig';


const OfferSection = (props) => {
  

  const [offers, setoffers] = useState([])
  const [title, setTitle] = useState('Popular')
  
  

  useEffect(() => {
    const fetchOffers = async ()=>{
      try {
        const querySnapshot = await getDocs(collection(db, 'offers')); // Fetch all documents from the "offers" collection
        const offersFromFirebase = querySnapshot.docs.map((doc) => doc.data()); // Map the document data to an array
        setoffers(offersFromFirebase)
      } 
      catch (error) {
        console.error('Error getting offers:', error);
      }
    }

    fetchOffers()
  }, [])
  



  return (
    <Box className="offerSection">
      <h2 className='OfferCategoryTitle'><FontAwesomeIcon icon={faPaperclip} />&nbsp;&nbsp;{title}</h2>
      <Box className="offerContainer">
        {offers.map((offer) => (
          <AnOffer offer= {offer}/>
        ))}
      </Box>
    </Box>
  );
};

export default OfferSection;
