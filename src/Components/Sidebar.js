import React, { useState } from 'react'
import './Sidebar.css'
import TwitterIcon from '@material-ui/icons/Twitter';
import SidebarOption from './SidebarOption';
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button, Avatar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import db from '../firebase';

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

function Sidebar() {
    const [tweetMessage, setTweetMessage] = useState("");
    const [tweetImage, setTweetImage] = useState('')

    const sendTweet = (e) => {
        e.preventDefault();

        db.collection("posts").add({
            displayName: "Juan",
            username: "Juandlc",
            verified: true,
            text: tweetMessage,
            image: tweetImage,
            avatar: 'https://pbs.twimg.com/profile_images/1192095716694528000/5uMBSWPV_400x400.jpg'
        });
        setTweetMessage("");
        setTweetImage("");

        setOpen(false)
    };

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className='tweetBox'>
                <form>
                    <div className="tweetBox__input">
                        <Avatar src='https://pbs.twimg.com/profile_images/1192095716694528000/5uMBSWPV_400x400.jpg' />
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
                    <Button  onClick={sendTweet} type="submit" className="tweetBox__tweetButton">Tweet</Button>
                </form>
            </div>
        </div>
    );

    return (
        <div className='sidebar'>
            <TwitterIcon className="sidebar__twitterIcon" />
            <SidebarOption active Icon={HomeIcon} text="Home" />
            <SidebarOption Icon={SearchIcon} text="Explore" />
            <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
            <SidebarOption Icon={MailOutlineIcon} text="Messages" />
            <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
            <SidebarOption Icon={ListAltIcon} text="Lists" />
            <SidebarOption Icon={PermIdentityIcon} text="Profile" />
            <SidebarOption Icon={MoreHorizIcon} text="More" />

            <Button onClick={() => setOpen(true)} variant="outlined" className="sidebar__tweet" fullWidth>
                Tweet
            </Button>
            <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    )
}

export default Sidebar
