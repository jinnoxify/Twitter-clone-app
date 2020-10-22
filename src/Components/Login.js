import React, { useState, useEffect } from 'react'
import './Login.css'
import SearchIcon from '@material-ui/icons/Search';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import {useHistory} from 'react-router-dom'
import { auth } from '../firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useStateValue } from '../StateProvider'

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Login() {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [{user}, dispatch] = useStateValue();

    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const onSignUp = (e) => {
        setOpen(true);
    }

    const onSignUp2 = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: username
                })
                history.push('/home')
            })
            .catch(error => alert(error.message));
        setOpen(false);
    }

    const onLogIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(auth => {
                // Logged in, redirect to homepage
                history.push('/home')
            })
            .catch(e => alert(e.message))
    }

    const onLogIn2 = () => {
        history.push('/login')
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <form className='login__formModal'>
                <TwitterIcon className='login__twitterIcon2' />
                <Input
                    placeholder='username'
                    type='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    placeholder='email'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={onSignUp2} className='login__buttonForm' type='submit'>Sign Up</Button>
            </form>
        </div>
    );

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if(authUser) {
                dispatch({
                    type:'SET_USER',
                    user: authUser
                })
            } else {
                dispatch({
                    type:'SET_USER',
                    user: null
                })
            }
        })
        return () => {
            unsubscribe();
        }
    }, [username])

    console.log(user);
    return (
        <div className='login'>
            <div className='login__left'>
                <div className='login__leftTitle'>
                    <SearchIcon />
                    <h2>Follow your interests.</h2>
                </div>
                <div className='login__leftTitle'>
                    <SupervisorAccountIcon/>
                    <h2>Hear what people are talking about.</h2>
                </div>
                <div className='login__leftTitle'>
                    <ModeCommentIcon className='login__modeComment'/>
                    <h2>Join the conversation.</h2>
                </div>
            </div>
            <div className='login__right'>
                <div className='login__form'>
                    <FormControl className='login__formControl'>
                        <InputLabel>Phone, email, or username</InputLabel>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='text'
                            aria-describedby="my-helper-text"
                        />
                    </FormControl>
                    <FormControl className='login__formControl'>
                        <InputLabel>Password</InputLabel>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            aria-describedby="my-helper-text"
                        />
                        <FormHelperText id="my-helper-text">Forgot password?</FormHelperText>
                    </FormControl>
                    <Button onClick={onLogIn} type='submit' className='login__button'>Log in</Button>
                </div>
                <TwitterIcon className='login__twitterIcon' />
                <div className='login__rightBody'>
                    <h1>See what’s happening in the world right now</h1>
                    <h2 >Join Twitter today.</h2>
                    <Button onClick={onSignUp} className='login__button1'>Sign up</Button>
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {body}
                    </Modal>
                    <Button onClick={onLogIn2} className='login__button2'>Log in</Button>
                </div>
            </div>
        </div>
    )
}

export default Login
