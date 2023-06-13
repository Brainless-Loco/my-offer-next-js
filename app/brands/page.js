"use client"
import React, { useEffect, useState } from 'react'
import { DataGrid ,Pagination } from '@mui/x-data-grid';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { db } from '@/firebase/firebaseConfig';
import Header from '@/components/Header/Header';
import HeadTagElements from '@/components/HeadTagElements/HeadTagElements';
import Link from 'next/link';

export default function page() {

  const [rowData, setRowData] = useState([]);



  const columns = [
    { field: 'serial', headerName: '#', width: 100,flex:0.1,
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{params.value}</div>
    )},
    { field: 'brandTitle', headerName: 'Brand Name', width: 200,textAlign:'center',flex:0.1,renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{params.value} </div>
    )},
    // {
    //   field: 'brandCover',
    //   headerName: 'Brand Cover',
    //   headerAlign: 'center',
    //   width: 300,
    //   flex:0.8,
    //   height:'400px',
    //   renderCell: (params) => (
    //     <div style={{ height: '400px',textAlign:'center' }}>
    //       <img src={params.value} alt="Brand Cover" style={{ height: '100%', width: 'auto',margin:'auto',padding:'20px' }} />
    //     </div>
    //   ),
    // },
  ];

  const getImageUrlToShow = (image)=>{
    const storageBucket= "myoffer-de0b5.appspot.com"
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(image)}?alt=media`;
    return imageUrl
  }

  useEffect(() => {

    const fetchData = async () => {
      const q = query(collection(db, 'accounts'), where('accountType', '==', 'brand'));

      try {
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc,index) => ({
          id: doc.id,
          serial:index+1,
          brandTitle: doc.data().brandInfo.brandTitle,
          // brandCover: getImageUrlToShow(doc.data().brandInfo.brandCover),
        }));
        setRowData(data)
      } catch (error) {
        console.error('Error fetching brand data:', error);
      }
    };
    fetchData()
    
  }, [])

  
  return (
    <html lang="en">
      <HeadTagElements title="myOffers Brands" />
      <body>
      <Header title={"All Brands on my"}/>
         <div style={{ height: "80vh", width: '80%',backgroundColor:'white',margin:'auto',borderRadius:'12px',overflow:'hidden' }}>
          <DataGrid
            rows={rowData}
            columns={columns}
            autoPageSize
            disableColumnMenu
            disableSelectionOnClick
            headerClassName="data-grid-header"
          />
        </div>
      </body>
    </html>
  )
}
