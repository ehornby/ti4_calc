import React, { useState } from 'react';
import { GoGear } from 'react-icons/go';
import { useUserValue } from '../../context';
import 
{ Modal,
ModalTitle, 
ModalBody, 
ModalFooter, 
Button, 
Form,
FormGroup,
FormControl } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import 
{ firebaseLogin, 
firebaseRegister, 
firebaseSignOut, 
getUserSignInName, changeUserSignInName } from '../../helpers/auth';
import { createNewUser } from '../../helpers';

export const Header = () => {
    const { loggedIn, setLoggedIn } = useUserValue();
    const [showProfile, setShowProfile] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [changeDisplayName, setChangeDisplayName] = useState('');
    
    let userDisplayName = '';
    if (localStorage.getItem('displayName')) {
        userDisplayName = localStorage.getItem('displayName');
    }
    else {
        userDisplayName = getUserSignInName();
    }

    const clearData = () => {
        setEmail('');
        setPassword('');
        setConfirm('')
    }

    const handleLogin = () => {
        firebaseLogin(email, password, setLoggedIn)
        clearData();
        setShowLogin(false);
    }

    const handleRegister = () => {
        if (password === confirm) {
            firebaseRegister(email, password, setLoggedIn)
            setShowRegister(false);
            createNewUser(email);
            clearData();
        }
        else {
            alert('Passwords must match!');
        }
    }

    const handleEmailChange = val => {
        setEmail(val);
    }

    const handlePasswordChange = val => {
        setPassword(val)
    }

    const handleConfirmChange = val => {
        setConfirm(val)
    }

    const handleNameChange = val => {
        setChangeDisplayName(val);
    }

    const handleLogout = () => {
        firebaseSignOut();
        setLoggedIn(false);
        localStorage.clear();
    }

    return (
        <>
        <header className='Header' data-testid='header'>
            <nav>
                <div className='home'>
                    <span className='home-title'>TI4 Tracker</span>
                </div>
                {loggedIn 
                ?
                <>
                <div className = 'welcome'>
                    <span className='welcome'>Welcome, {userDisplayName}!</span>
                </div>
                <div className='links'>
                    <span 
                        className='logout'
                        onClick={handleLogout}
                    >
                        Log Out
                    </span>
                    <span 
                        className='settings'
                        onClick={() => setShowProfile(true)}
                    >
                        <GoGear />
                    </span>
                </div>
                </>
                :
                <>
                <div className='links'>
                    <span 
                        className='login'
                        onClick={() => setShowLogin(true)
                        }
                    >
                        Login
                    </span>
                    <span 
                        className='register'
                        onClick={() => setShowRegister(true)}
                    >
                        Register
                    </span>
                </div>
                </>
                }
            </nav>
        </header>
        <div className = 'show-login'>
            <Modal
                show={showLogin}
                onHide={() => setShowLogin(false)}
            >
                <ModalHeader>
                    <ModalTitle>Login</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup controlId='email'>
                            <FormControl 
                                type='email' 
                                placeholder='Email address'
                                onChange={(e) => handleEmailChange(e.target.value)} />
                        </FormGroup>
                        <FormGroup controlId='password'>
                            <FormControl 
                                type='password' 
                                placeholder='Password'
                                onChange={(e) => handlePasswordChange(e.target.value)}                               
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => setShowLogin(false)}
                        variant='outline-danger'
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleLogin}
                        variant='outline-success'
                    >
                        Login
                    </Button>

                </ModalFooter>
            </Modal>
        </div>
        <div className='show-register'>
            <Modal
                show={showRegister}
                onHide={() => setShowLogin(false)}
            >
                <ModalHeader>
                    <ModalTitle>Register</ModalTitle>
                </ModalHeader>
                <ModalBody>                    
                    <Form>
                        <FormGroup controlId='email'>
                            <FormControl 
                                type='email' 
                                placeholder='Email address'
                                onChange={(e) => handleEmailChange(e.target.value)}                            
                            />
                        </FormGroup>
                        <FormGroup controlId='password'>
                            <FormControl 
                                type='password' 
                                placeholder='Password' 
                                onChange={(e) => handlePasswordChange(e.target.value)}                        
                        />
                        </FormGroup>
                        <FormGroup controlId='confirm'>
                            <FormControl 
                                type='password' 
                                placeholder='Confirm Password' 
                                onChange={(e) => handleConfirmChange(e.target.value)}
                        />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => setShowRegister(false)}
                        variant='outline-danger'
                    >
                        Cancel
                    </Button>                
                    <Button
                        onClick={handleRegister}
                        variant='outline-success'
                    >
                        Register
                    </Button>

                </ModalFooter>
            </Modal>
        </div>
        <div className='show-profile'>
            <Modal
                show={showProfile}
                onHide={() => setShowProfile(false)}
            >
                <ModalHeader>
                    <ModalTitle>Profile</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className='change-display-name'>
                    <div className='name-entry'>
                        <FormGroup 
                            controlId='displayName'
                        >
                            <FormControl
                                type='text'
                                placeholder='Enter new display name here'
                                onChange={(e) => handleNameChange(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                    <div className='name-confirm'>
                        <Button
                            onClick={() => changeUserSignInName(changeDisplayName)}
                            className='name-confirm'
                            variant='outline-primary'
                        >
                            Change Name
                        </Button>
                    </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className='close-profile'
                        variant='outline-danger'
                        onClick={() => setShowProfile(false)}
                    >
                        Close Profile
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
        </>
    );
}