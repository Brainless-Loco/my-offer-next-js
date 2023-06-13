import { faComment, faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import { gsap } from 'gsap'
import Link from 'next/link'
import React,{ useEffect,useRef } from 'react'

export default function AnOffer(props) {

    const viewRef = useRef()

    const {offer} = props;

    const getImageUrlToShow = (image)=>{
        const storageBucket= "myoffer-de0b5.appspot.com"
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(image)}?alt=media`;
        return imageUrl
    }

    useEffect(() => {
        const component = viewRef.current;
        const timeline = gsap.timeline({ repeat: -1, yoyo: true });
        timeline.to(component, {
            y: -20,
            duration: 1.5,
            ease: 'power1.inOut',
        }); 


    }, [])
    

    return (
        <Link ref={viewRef} href={"offer/"+offer.offerRef} key={offer.id} className="offerItem">
                <img className='offerCoverImage' width={400} height={'auto'} src={getImageUrlToShow(offer.offerCover)} ></img>
                <Box className="offerDetails">
                <h2 className='offerTitle'>{offer.offerTitle}</h2>
                <p className='OfferBrandName'> {offer.brandTitle}</p>
                
                <Box>
                    <p className='durationDate' style={{textAlign:'left'}}>From: {offer.startDate}</p>
                    <p className='durationDate' style={{textAlign:'right'}}>To: {offer.endDate}</p>
                </Box>
                
                </Box>
                <Box className="offerStats">
                    <Box className='likeDislikeDiv'>
                    <FontAwesomeIcon icon={faThumbsUp} height={20} />&nbsp;({offer.likes.length})
                    </Box>
                    <Box className='likeDislikeDiv'>
                    <FontAwesomeIcon icon={faThumbsDown} height={20} />&nbsp;({offer.dislikes.length})
                    </Box>
                    <Box className='likeDislikeDiv'>
                    <FontAwesomeIcon icon={faComment} height={20} />&nbsp;({offer.comments.length})
                    </Box>
                </Box>
            </Link>
    )
}
