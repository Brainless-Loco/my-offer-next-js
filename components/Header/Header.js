"use client"

import React, { useEffect, useState } from 'react';
import './Header.css';
import Logo from '../MenuBar/Logo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
                <a className='profileNavLinks' href="/profile">Electronics</a>
                <a className='profileNavLinks' href="/settings">Fashion</a>
                <a className='profileNavLinks' href="/logout">Farnichars</a>
            </div>
        </div>
      </div>
      <div className="links">
        <Link href="/about">About Us</Link>
        <Link style={{color:'red'}} href="/deals">Hot Deals!</Link>
        <Link href="/brands">Brands</Link>
        <Link href="/offerMap">Global</Link>
      </div>
      {
        userData!=null && 
        <div className="profile">
          <img src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="Profile" />
          <div className="dropdown">
              <a className='profileNavLinks' href="/profile">Profile</a>
              <a className='profileNavLinks' href="/settings">Settings</a>
              <a className='profileNavLinks' href="/logout">Logout</a>
          </div>
      </div>
      }
     
    </header>
  );
};

export default Header;
