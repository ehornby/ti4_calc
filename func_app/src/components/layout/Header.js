import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';

export const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    return (
        <header className='Header' data-testid='header'>
            <nav>
                <div className='home'>
                    <span className='home-icon'>
                        <FaHome />
                    </span>
                    <span className='home-title'>TI4 Tracker</span>
                </div>
                <div className='links'>
                    {loggedIn 
                    ?
                    <>
                    <span className='login'>Login</span>
                    <span className='register'>Register</span>
                    </>
                    :
                    <>
                    <span className='welcome'>Welcome, $username!</span>
                    <span className='settings'><GoGear /></span>
                    </>
                    }
                </div>
            </nav>
        </header>
    )
}