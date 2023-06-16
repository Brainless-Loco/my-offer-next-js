"use client"

import HeadTagElements from '@/components/HeadTagElements/HeadTagElements';
import Header from '@/components/Header/Header';
import { db } from '@/firebase/firebaseConfig';
import { Box, CircularProgress } from '@mui/material';
import { GoogleMap, LoadScript, Marker,InfoWindow  } from '@react-google-maps/api';
import { collection, getDocs } from 'firebase/firestore/lite';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useState } from 'react';

export default function GMap() {

    const containerStyle = {
        width: '100%',
        height: '90vh',
    };

    const [selectedMarker, setSelectedMarker] = useState(null);
    const [offers, setoffers] = useState([])
    const [loading, setLoading] = useState(false)
    const [center, useCenter] = useState({lat: 37.7749, lng: -122.4194})

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    };

    const handleInfoWindowClose = () => {
        setSelectedMarker(null);
    };


    useEffect(() => {
        const fetchOffers = async ()=>{
            setLoading(true)
            try {
              const querySnapshot = await getDocs(collection(db, 'offers')); // Fetch all documents from the "offers" collection
              const offersFromFirebase = querySnapshot.docs.map((doc) => doc.data()); // Map the document data to an array
              setoffers(offersFromFirebase)
            } 
            catch (error) {
              console.error('Error getting offers:', error);
            }
            setLoading(false)
          }
        fetchOffers()
    }, [])
    

    return (
        <html lang="en">
            <HeadTagElements title="Offer Map" />
            <body>
                <Header/>
                {
                    loading? 
                    <Box sx={{width:'85%',backgroundColor:'#232324', display:'flex',justifyContent:'center',margin:'auto',marginTop:"5px",padding:'20px',borderRadius:'12px',flexDirection:'column',marginBottom:'20px'}}>
                        <CircularProgress style={{textAlign:'center',margin:'auto',color:'white'}} />
                    </Box> :

                    <LoadScript googleMapsApiKey="AIzaSyDYUDVcyIfjP-xMid-UAfMcwlqOBeii__I">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                        >

                            {
                            offers.length>0 && offers.map((offer)=>
                                <Marker position={{lat:offer.offerLocation.latitude,lng: offer.offerLocation.longitude}} onClick={() => handleMarkerClick(offer)} />
                            )
                            }
                            {selectedMarker && (
                                    <InfoWindow
                                        position={{lat:selectedMarker.offerLocation.latitude,lng: selectedMarker.offerLocation.longitude}}
                                        onCloseClick={handleInfoWindowClose}
                                    >
                                        <div style={{textAlign:'center',color:'black',}}>
                                            <h3 style={{color:'#FF5722',fontWeight:'bold',fontSize:'18px'}}>{selectedMarker.offerTitle}</h3>
                                            <p style={{fontWeight:'600',color:'#081533',fontSize:'13.5px'}}>{selectedMarker.brandTitle}</p>
                                            <Link style={{color:'blue',fontWeight:'400'}} href={'/offer/'+selectedMarker.offerRef}>Read More</Link>
                                        </div>
                                    </InfoWindow>
                                )
                            }
                            
                        </GoogleMap>
                    </LoadScript>
                }
                
            </body>
        </html>
        
    )
}
