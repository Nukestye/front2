
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createPortal } from 'react-dom';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeReact from 'rehype-react'
import remarkHtml from 'remark-html'
import rehypeRaw from 'rehype-raw'

import { FaEye } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaCommentDots } from "react-icons/fa6";

import './css/BlogPage.css';

import { NotificationPopup } from './NotificationPopup';

import common from '../util/common.json';

function BlogPage({pId}) {

    let {id} = useParams();

    // if we are passing an id; we use that id instead of url id
    if (pId != null) id = pId;

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [content, setContent] = useState('###### Nothing here');
    const [title, setTitle] = useState('###### Nothing here');
    const [views, setViews] = useState(0);
    const [likes, setLikes] = useState(0);
    const [numComments, setNumberOfComments] = useState(0);
    const [comments, setComments] = useState();

    // TODO:
    //      Footer design to separate the comments and the content
    //      Comments 
    //      Backend support to get both the comments and content

    const {REACT_APP_BACKEND_URL, REACT_APP_BACKEND_PORT} = process.env;

    useEffect(() => {
        setLoading(true);
        fetch(`http://${REACT_APP_BACKEND_URL}:${REACT_APP_BACKEND_PORT}/blogs/get-single-blog`, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({blogId: id}),
        })
        .then((response) => {return response.json()})
        .then(json => {

            if (json['status'] != 200) throw Error('Unknown error occured');

            setTitle(json['data']['title']);
            setContent(json['data']['content']);
            setViews(json['data']['views']);
            setLikes(json['data']['likes']);
            setNumberOfComments(json['data']['commentsNum']);
            setLoading(false);
            setOpen(false);
        }).catch(error => {
            if (common.dev.CONSOLE_DEBUG) console.error(`[REACT][BlogPage] Blog Content not loading \n ${error}`);
            setLoading(false);
            setOpen(true);
        });
    }, [id])

    return (
        <div className="blog container">
            {loading ? createPortal(
                <Fragment>
                    <div className='popup'>
                        <div className='spinner'></div>
                    </div>
                </Fragment>, document.body
                ) : null}

            {open ? <NotificationPopup 
                        title='Error' 
                        message='An error occured when loading blog content' 
                        timeout='5s'/> 
            : null}
            <div className='blog title'>
                {title}
                <div className='blog stats'>
                    <span>
                        {views}
                        <FaEye />
                    </span>
                    <span>
                        {likes}
                        <FcLike />
                    </span>
                    <span>
                        {numComments}
                        <FaCommentDots />
                    </span>
                </div>
            </div>
            <div className='blog content'> 
                <Markdown 
                    remarkPlugins={[remarkGfm, remarkHtml]} 
                    rehypePlugins={[rehypeRaw, rehypeReact]}
                >
                    {content}
                </Markdown>
            </div>
            <div className='blog footer'>
                <div className='blog comments'>asd</div>
            </div>

        </div>
    )
}

export default BlogPage;