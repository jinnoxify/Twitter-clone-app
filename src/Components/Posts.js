import React, {forwardRef} from 'react'
import './Posts.css'
import { Avatar } from '@material-ui/core'
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import { useStateValue } from '../StateProvider';

const Posts = forwardRef(({verified, username, displayName, avatar, image, text}, ref) => {
    const [{user}] = useStateValue()
    console.log(user);
    return (
        <div className='post' ref={ref}>
            <div className='post__avatar'>
                <Avatar src='https://img2.freepng.es/20180622/pqa/kisspng-login-computer-icons-download-avatar-icon-5b2cfbf8e8da45.3511932815296747449538.jpg' />
            </div>
            <div className='post__body'>
                <div className='post__header'>
                    <div className='post__headerText'>
                        <h3>
                            {user.displayName}{' '}
                            <span>
                                {verified && <VerifiedUserIcon className='post__badge' />} @{user.displayName}
                            </span>
                        </h3>
                    </div>
                    <div className='post__headerDescription'>
                        <p>{text}</p>
                    </div>
                </div>
                <img src={image} alt='' />
                <div className='post__footer'>
                    <ChatBubbleOutlineIcon fontSize="small" />
                    <RepeatIcon fontSize="small" />
                    <FavoriteBorderIcon fontSize="small" />
                    <PublishIcon fontSize="small" />
                </div>
            </div>
        </div>
    )
})

export default Posts
