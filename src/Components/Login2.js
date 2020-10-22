import React from 'react'
import './Login2.css'
import TwitterIcon from '@material-ui/icons/Twitter';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';

function Login2() {
    return (
        <div className='login2'>
            <div className='login2__container'>
                <TwitterIcon className='login2__twitterIcon'/>
                <h2>Log in to Twitter</h2>
                <FormControl className='login2__formControl'>
                    <InputLabel htmlFor="my-input">Phone, email, or username</InputLabel>
                    <Input type='text' aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl className='login2__formControl'>
                    <InputLabel htmlFor="my-input">Password</InputLabel>
                    <Input type='password' aria-describedby="my-helper-text" />
                </FormControl>
                <Button className='login2__button'>Log in</Button>
                <p>
                    <a href='https://twitter.com/account/begin_password_reset'>Forgot password? . Sign up forTwitter</a>
                </p>
            </div>
        </div>
    )
}

export default Login2
