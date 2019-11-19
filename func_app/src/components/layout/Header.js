import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { useUserValue } from '../../context';

export const Header = () => {
    const { loggedIn, setLoggedIn } = useUserValue();
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
                {loggedIn 
                ?
                <>
                <div className = 'welcome'>
                    <span className='welcome'>Welcome, $username!</span>
                </div>
                <div className='links'>
                    <span 
                        className='logout'
                        onClick={() => setLoggedIn(false)}
                    >
                        Log Out
                    </span>
                    <span className='settings'><GoGear /></span>
                </div>
                </>
                :
                <>
                <div className='links'>
                    <span 
                        className='login'
                        onClick={() => setLoggedIn(true)
                        }
                    >
                        Login
                    </span>
                    <span className='register'>Register</span>
                </div>
                </>
                }
            </nav>
        </header>
    )
}