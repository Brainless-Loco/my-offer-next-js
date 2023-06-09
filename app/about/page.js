"use client"

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header/Header'
import HeadTagElements from '@/components/HeadTagElements/HeadTagElements'
import { Box } from '@mui/material'
import './about.css'
import Logo from '@/components/MenuBar/Logo'

export default function page() {
    const params = useParams()

    const [rating, setRating] = useState(0)

    console.log(rating)

    return (
        <html lang="en">
            <HeadTagElements title="A Brand" />
            <body>
                <Header/>

                <Box sx={{width:'85%',backgroundColor:'#232324', display:'flex',justifyContent:'center',margin:'auto',marginTop:"5px",padding:'10px 20px',borderRadius:'12px',flexDirection:'column',marginBottom:'10px'}}>
                    
                    <Box sx={{width:'50%',margin:'auto'}}>
                        <Logo/>
                    </Box>
                    
                </Box>

                <Box sx={{width:'85%',backgroundColor:'#232324', display:'flex',justifyContent:'center',margin:'auto',marginTop:"5px",padding:'10px 20px',borderRadius:'12px',flexDirection:'column',marginBottom:'20px'}}>
                    <iframe style={{margin:'auto',borderRadius:'10px',paddingBottom:'10px'}} width="713" height="401" src="https://www.youtube.com/embed/W6NZfCO5SIk" title="JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


                        Welcome to myOffer, where you can explore a world of ongoing and upcoming offers from various brands, both online and offline. Discover incredible deals, discounts, and promotions conveniently in one place.<br/><br/>

                    <h2 className='pointBold'>Search Made Easy:</h2>
                    Our user-friendly search feature allows you to find offers effortlessly. Whether you prefer using images or text, simply enter your desired product or brand, and we'll present you with a curated list of relevant offers. No more endless scrolling or browsing through multiple websites – we've streamlined the process to save you time and effort.<br/><br/>

                    <h2 className='pointBold'>Global Offer Map:</h2>
                    Visualize offers around the world with our interactive map feature. Explore the map to find exciting deals in different regions and cities. Whether you're planning a trip or simply want to see what's happening in your area, our map provides a comprehensive view of offers across the globe. Discover hidden gems, exclusive promotions, and limited-time deals wherever you go.<br/><br/>

                    <h2 className='pointBold'>Discover Brands:</h2>
                    In addition to offers, our platform allows you to discover a wide range of brands. Explore new favorites or find specific brands you love. Our brand directory provides comprehensive information about each brand, including their latest offers, products, and store locations. Whether you're a loyal customer or want to try something new, we've got you covered.<br/><br/>

                    <h2 className='pointBold'>Personalized Experience:</h2>
                    We understand that everyone has unique preferences and interests. That's why we offer personalized recommendations based on your search history and interests. Discover offers tailored specifically to your preferences, ensuring you never miss out on the best deals from your favorite brands.<br/><br/>

                    
                    <h2 className='pointBold'>Save and Share:</h2>
                    Found an offer that catches your eye? Save it for later and create your personalized collection of favorites. Share exciting offers with friends and family through social media or email, so they can enjoy the benefits too.<br/><br/>

                    <h2 className='pointBold'>Stay Updated:</h2>
                    Be the first to know about new offers, flash sales, and exclusive promotions by subscribing to our newsletter. Stay updated with the latest trends, events, and brands in the market. We'll keep you informed so you never miss out on an amazing deal.<br/><br/>

                    Start your journey with us today and unlock a world of unbeatable offers, discover exciting brands, and experience shopping like never before. Join our community of savvy shoppers and let us help you save money while enjoying the best products and services around the world.<br/><br/>

                </Box>

            </body>
        </html>
    )
}
