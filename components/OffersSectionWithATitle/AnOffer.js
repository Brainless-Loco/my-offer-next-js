import { faComment, faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AnOffer(props) {

    const {offer} = props;

    return (
        <Link href={'/'} key={offer.id} className="offerItem">
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
