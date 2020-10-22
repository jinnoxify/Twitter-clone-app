import React, { useState } from 'react'
import './TweetBox.css'
import { Avatar, Button } from '@material-ui/core'
import db from "../firebase";
import { useStateValue } from '../StateProvider';

function TweetBox() {
    const [tweetMessage, setTweetMessage] = useState("");
    const [tweetImage, setTweetImage] = useState('');
    const [{user}] = useStateValue()

    const sendTweet = (e) => {
        e.preventDefault();

        db.collection("posts").add({
            displayName: user.displayName,
            username: user.displayName,
            verified: true,
            text: tweetMessage,
            image: tweetImage,
            avatar: 'https://img2.freepng.es/20180622/pqa/kisspng-login-computer-icons-download-avatar-icon-5b2cfbf8e8da45.3511932815296747449538.jpg'
        });
        setTweetMessage("");
        setTweetImage("");
    };

    return (
        <div className='tweetBox'>
            <form>
                <div className="tweetBox__input">
                    <Avatar src='https://img2.freepng.es/20180622/pqa/kisspng-login-computer-icons-download-avatar-icon-5b2cfbf8e8da45.3511932815296747449538.jpg' />
                    <input
                        onChange={(e) => setTweetMessage(e.target.value)}
                        value={tweetMessage}
                        type='text'
                        placeholder="What's happening?"
                    />
                </div>
                <input
                    value={tweetImage}
                    onChange={(e) => setTweetImage(e.target.value)}
                    className="tweetBox__imageInput"
                    placeholder="Optional: Enter image URL"
                    type="text"
                />
                <Button onClick={sendTweet} type="submit" className="tweetBox__tweetButton">Tweet</Button>
            </form>
        </div>
    )
}

export default TweetBox
