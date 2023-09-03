import React, { useState, useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const NewProfile = () => {

    const navigate = useNavigate();
    const location = useLocation();
    let adminText = location.state?.adminText;
    let workerText = location.state?.workerText;

    const handleAdmin = (e) => {
        navigate('/NewAdmin')
    }

    const handleWorker = (e) => {
        navigate('/NewWorker')
    }


    return(
        <div className='newprofilecontainer'>
            <div className='admin' onClick={handleAdmin}>
                <img src={require('./adminIcon.png')} className="adminImage"/>
                <div className="overlay">
                    <div className="text">{adminText}</div>
                </div>    
            </div>

            <div className='admin' onClick={handleWorker}>
                <img src={require('./worker.png')} className="workerImage"/>
                <div className="overlay">
                    <div className="text">{workerText}</div>
                </div>    
            </div>
            
        </div>
    );
};

export default NewProfile;
