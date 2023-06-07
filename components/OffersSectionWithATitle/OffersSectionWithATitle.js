"use client"

import React from 'react';
import './Main.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp,faThumbsDown,faComment } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { Box } from '@mui/material';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';


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
          <a href={'/'} key={offer.id} className="offerItem">
            <Image className='offerCoverImage' width={400} height={300} src="/images/1.jpg" />
            <Box className="offerDetails">
              <h2 className='offerTitle'>{offer.title}</h2>
              <p className='OfferBrandName'> {offer.brand}</p>
              
              <Box>
                <p className='durationDate' style={{textAlign:'left'}}>Start Date: {offer.startDate}</p>
                <p className='durationDate' style={{textAlign:'right'}}>End Date: {offer.endDate}</p>
              </Box>
              
            </Box>
            <Box className="offerStats">
                <Box className='likeDislikeDiv'>
                  <FontAwesomeIcon icon={faThumbsUp} height={20} />&nbsp;({offer.likes})
                </Box>
                <Box className='likeDislikeDiv'>
                  <FontAwesomeIcon icon={faThumbsDown} height={20} />&nbsp;({offer.dislikes})
                </Box>
                <Box className='likeDislikeDiv'>
                  <FontAwesomeIcon icon={faComment} height={20} />&nbsp;({offer.comments})
                </Box>
              </Box>
          </a>
        ))}
      </Box>
    </Box>
  );
};

export default OfferSection;
