import { faComment, faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import { gsap } from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import React,{ useEffect,useRef } from 'react'

export default function AnOffer(props) {

    const viewRef = useRef()

    const {offer} = props;

    useEffect(() => {
        const component = viewRef.current;

        const timeline = gsap.timeline({ repeat: -1, yoyo: true });
        timeline.to(component, {
            y: -20, // Move up by 10 pixels
            duration: 1.5,
            ease: 'power1.inOut',
        });


    }, [])
    

    return (
        <Link ref={viewRef} href={'/'} key={offer.id} className="offerItem">
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
            </Link>
    )
}
