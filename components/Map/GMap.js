"use client"

import { GoogleMap, LoadScript, Marker,InfoWindow  } from '@react-google-maps/api';
import React from 'react'
import { useState } from 'react';

export default function GMap() {

    const containerStyle = {
        width: '100%',
        height: '450px',
      };
    
      const center = {
        lat: 37.7749,
        lng: -122.4194
      };
    
    const [selectedMarker, setSelectedMarker] = useState(null);

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    };

    const handleInfoWindowClose = () => {
        setSelectedMarker(null);
    };
    

    return (
        <LoadScript googleMapsApiKey="AIzaSyDYUDVcyIfjP-xMid-UAfMcwlqOBeii__I">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                <Marker position={center} onClick={() => handleMarkerClick(center)} />
                {selectedMarker && (
                <InfoWindow
                    position={selectedMarker}
                    onCloseClick={handleInfoWindowClose}
                >
                    <div style={{textAlign:'center',color:'black',}}>
                        <h3 style={{color:'#FF5722',fontWeight:'bold',fontSize:'18px'}}>70% sale!!</h3>
                        <p style={{fontWeight:'600',color:'#081533',fontSize:'13.5px'}}>Brand Name</p>
                        <a style={{color:'blue',fontWeight:'400'}} href='/brands'>Read More</a>
                    </div>
                </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    )
}
