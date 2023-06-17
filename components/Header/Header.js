"use client"

import React, { useEffect, useState } from 'react';
import './Header.css';
import Logo from '../MenuBar/Logo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass, faQuestion, faTicket } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';

const Header = () => {

  const router = useRouter();

  const [userData, setuserData] = useState(null)


  useEffect(() => {
    const checkIfRememberMeWasClicked = ()=>{
        const rememberMeValue = localStorage.getItem("rememberMe");
        if(rememberMeValue=='yes'){
            const userDataFromLocalStorage = JSON.parse(localStorage.getItem('userData'));
            if (userDataFromLocalStorage) {
              setuserData(userDataFromLocalStorage)
            }
        }
    }
    checkIfRememberMeWasClicked()
}, [])


  return (
    <header className="header">
      <Link href={"/"} className="logo">
        <Logo/>
      </Link>
      <div className="categories">
        {/* <select>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select> */}
        <div className="profile">
            Category
            <div className="dropdown">
                <Link className='profileNavLinks' href="/searchByCategory/Electronics">Electronics</Link>
                <Link className='profileNavLinks' href="/searchByCategory/Fashion">Fashion</Link>
                <Link className='profileNavLinks' href="/searchByCategory/Farnichars">Furnichars</Link>
            </div>
        </div>
      </div>
      <div className="links">
        <Link href="/search" style={{border:'1px solid white',padding:'8px 15px',width:'130px',borderRadius:'8px',textAlign:'center'}}><FontAwesomeIcon icon={faMagnifyingGlass } />&nbsp;Search</Link>
        <Link href="/offerMap" style={{border:'1px solid white',padding:'8px 15px',width:'130px',borderRadius:'8px',textAlign:'center'}}><FontAwesomeIcon icon={faLocationDot}/>&nbsp;Global</Link>
        <Link href="/about" style={{border:'1px solid white',padding:'8px 15px',width:'130px',borderRadius:'8px',textAlign:'center'}}>About Us</Link>
        <Link style={{color:'red',border:'1px solid white',padding:'8px 15px',width:'130px',borderRadius:'8px',textAlign:'center'}} href="/deals">Hot Deals!</Link>
        <Link href="/brands" style={{border:'1px solid white',padding:'8px 15px',width:'130px',borderRadius:'8px',textAlign:'center'}}>Brands</Link>
      </div>
      {
        userData!=null && 
        <div className="profile">
          <img src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="Profile" />
          <div className="dropdown">
              <a className='profileNavLinks' href="/profile">Profile</a>
              <a className='profileNavLinks' href="/settings">Settings</a>
              <Button onClick={()=>{
                localStorage.removeItem('rememberMe')
                localStorage.removeItem('userData')
                router.replace('/authenticate')
              }} sx={{color:'white',fontWeight:'bold'}} className='profileNavLinks' >Logout</Button>
          </div>
      </div>
      }
      {
         userData==null &&
         <Link style={{color:'white',border:'1px solid white',padding:'8px 10px',width:'170px',borderRadius:'8px',textAlign:'center'}} href={'/authenticate'} >Log in / Sign Up</Link>
      }
     
    </header>
  );
};

export default Header;
