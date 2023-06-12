"use client"

import React, { useEffect } from 'react'
import {useRouter } from 'next/navigation'
import HeadTagElements from '@/components/HeadTagElements/HeadTagElements'
import Header from '@/components/Header/Header'
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import {convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html'
import './createOffers.css'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore/lite'
import { db } from '@/firebase/firebaseConfig'


export default function page() {

    const [loading, setloading] = useState(false)

    const router = useRouter()


    const [offerCover, setOfferCover] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [offerDescription, setOfferDescription] = useState(null);
    const [previewPhoto, setPreviewPhoto] = useState(null);


    const [brandData, setbrandData] = useState({})
    

    const handleCoverPhotoChange = (event) => {
        const file = event.target.files[0];
        setOfferCover(file);
        setPreviewPhoto(URL.createObjectURL(file));
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date['$d'].toString().substr(0,15))
    };


    const handleEndDateChange = (date) => {
        setEndDate(date['$d'].toString().substr(0,15))
    };

    const handleOfferDescriptionChange = (editorState) => {
        setOfferDescription(editorState);
        handleGetHtmlCode()
    };

    const handleGetHtmlCode = () => {
        if(offerDescription==null || offerDescription.getCurrentContent()==null) return;
        const htmlCorr = draftToHtml(convertToRaw(offerDescription.getCurrentContent()))
        return htmlCorr
    };
    
    const uploadTheOfferCover = async (fileName)=>{
        const  storageBucket = "myoffer-de0b5.appspot.com";
        try {
            const response = await fetch(
              'https://firebasestorage.googleapis.com/v0/b/'+storageBucket+'/o?name='+fileName,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'image/jpeg' || 'image/png' || 'image/jpg',
                },
                body: await fetch(previewPhoto).then((response) => response.blob()),
              }
            );
           } 
           catch (error) {
            alert('Error uploading image:', error);
            console.log(error)
          }
    }


    const setDefaultValues = ()=>{
        setCategory('')
        setEndDate(null)
        setStartDate(null)
        setTitle('')
        setOfferCover(null)
        setPreviewPhoto(null)
        setOfferDescription(null)
    }


    const handleSubmit = async (event) => {
        setloading(true)
        try {
            const {accountRef} = brandData
            const {brandTitle,brandCover} = brandData.brandInfo
            const fileName = `brandOfferImages/${accountRef}_${Date.now()}`;
            uploadTheOfferCover(fileName)
            const offerData = {
                accountRef: accountRef,
                brandCover: brandCover,
                brandTitle: brandTitle,
                category: category,
                endDate: endDate,
                offerCover: fileName,
                offerDescription: handleGetHtmlCode(),
                offerTitle: title,
                postDate: new Date().toISOString(),
                startDate: startDate,
                likes:[],
                dislikes:[],
                comments:[]
            };
            const docRef = await addDoc(collection(db, 'offers'), offerData);
            await updateDoc(doc(db, 'offers', docRef.id), {
                offerRef: docRef.id
            });
            alert('Offer Posted Successfully!')
          } catch (error) {
            console.error('Error adding offer:', error);
          }
        setDefaultValues()
        router.refresh();
        setloading(false)
    };
    
    useEffect(() => {
        const checkIfUserIsABrand = ()=>{
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData) {
                const accountType = userData.accountType;
                
                setbrandData(userData)
                if (accountType !== 'brand') {
                    router.replace('/');
                }else{
                    setbrandData(userData)
                }
            }
            else router.replace('/');
        }
        checkIfUserIsABrand()
    
    }, [])
  


  return (
    <html lang="en">
      <HeadTagElements title="Create an Offer" />
      <body>
          <Header/>

          <Box sx={{width:'85%',backgroundColor:'#232324', display:'flex',justifyContent:'center',margin:'auto',marginTop:"5px",padding:'20px',borderRadius:'12px',flexDirection:'column',marginBottom:'20px'}}>

                <Typography variant='h2' sx={{textAlign:'center'}}>Create an Offer</Typography>
                <input accept="image/*" id="coverPhoto" type="file"  onChange={handleCoverPhotoChange} style={{ display: 'none' }}
                />
                <label htmlFor="coverPhoto"> <Button sx={{marginBottom:'10px'}} variant="contained" component="span" fullWidth> {offerCover ? 'Change Poster' : 'Upload Poster'}
                    </Button>
                </label>
                {previewPhoto && (
                    <img src={previewPhoto} alt="Uploaded Cover" style={{ width: '50%', paddingBottom:'10px', margin: '16px',margin:'auto' }} />
                )}

                <Box sx={{color:'white',width:'100%',textAlign:'center',display:'flex',justifyContent:'space-around',marginBottom:'15px'}}>
                    <TextField sx={{color:'white',border:'1px solid white',borderRadius:'8px',width:'60%',margin:'auto',marginBottom:'10px'}} placeholder='Write the title' value={title} 
                        onChange={handleTitleChange} inputProps={{style:{color:'#fff'}}}
                    />

                    <TextField sx={{color:'white',border:'1px solid white',borderRadius:'8px',width:'30%',margin:'auto',marginBottom:'10px'}} placeholder='Category' value={category} 
                        onChange={(e)=>setCategory(e.target.value)} inputProps={{style:{color:'#fff'}}}
                    />
                </Box>

                  <Box sx={{color:'white',width:'100%',textAlign:'center',display:'flex',justifyContent:'space-around',marginBottom:'15px'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker onChange={handleStartDateChange} label="Start Date" />
                        </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider sx={{border:'1px solid white'}} dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker onChange={handleEndDateChange} label="End Date" />
                        </DemoContainer>
                    </LocalizationProvider>

                  </Box>
                  
                

                <Editor  editorStyle={{padding:'10px',height:"400px",border:'1px solid white',borderRadius:'10px',marginBottom:'20px',color:'white'}} editorState={offerDescription} onEditorStateChange={handleOfferDescriptionChange} />

                <Button variant="contained" type="submit" onClick={handleSubmit}>
                    {loading? <CircularProgress size={20} style={{color:'#fff'}}/>: "Submit"}
                </Button>
          </Box>

      </body>
    </html>
  )
}
