"use client"

import React from 'react';
import './Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import AnOffer from './AnOffer';


const OfferSection = () => {

const title = 'Popular';
  const offers = [
    {
      id: 1,
      coverPhoto: 'https://example.com/offer1.jpg',
      title: '50% Off Summer Sale',
      brand: 'ABC Company',
      startDate: '2023-06-01',
      endDate: '2023-06-15',
      likes: 100,
      dislikes: 10,
      comments: 20,
    },
    {
      id: 2,
      coverPhoto: 'https://example.com/offer2.jpg',
      title: 'Limited Time Flash Sale',
      brand: 'XYZ Brand',
      startDate: '2023-06-10',
      endDate: '2023-06-12',
      likes: 80,
      dislikes: 5,
      comments: 15,
    },
  ];
  



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
