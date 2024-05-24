import React from 'react'
import {  NavLink, useNavigate } from 'react-router-dom';
import datalist from '../../asset/homeIcons/browser_634427.png'
import complainlist from '../../asset/homeIcons/chat-bubble_14620545.png'
import clearencelist from '../../asset/homeIcons/resume_7786876.png'
import lostmobile from '../../asset/homeIcons/no-mobile_14595478.png'
import './newHome.css'
const NewHome = () => {
  const navigate = useNavigate();

  const gotocriminalPage = () => {
    navigate('/criminallist')
  };
  const gotoclearancePage = () => {
    navigate('/clearancepage')
  };
  const gotoOnlineComplainPage = () => {
    navigate('/onlinecomplain')
  };
  const gotolostPghonePage = () => {
    navigate('/lostphone')
  };

  return (
    <div className='main-window'>
        <h1>Home page ...</h1>
      <div className='inmain-window'>
      <div className='cont-newhome' onClick={gotocriminalPage}>
           <label>Criminals Data list</label>
           <div className='items-list'>
            <img src={datalist} alt='datalist'></img>
           </div>
        </div>
        <div className='cont-newhome' onClick={gotoclearancePage}>
           <label>Police Clearence request</label>
           <div className='items-list'>
            <img src={clearencelist} alt='clearencelist'></img>
           </div>
        </div>
        <div className='cont-newhome' onClick={gotoOnlineComplainPage}>
        <label>Online Complaints details</label>
        <div className='items-list'>
            <img src={complainlist} alt='complainlist'></img>
           </div>
        </div>
        <div className='cont-newhome' onClick={gotolostPghonePage}>
             <label>Lost Mobile Complains</label>
             <div className='items-list'>
            <img src={lostmobile} alt='lostmobile'></img>
           </div>
        </div>
      </div>
    </div>
  )
}

export default NewHome
