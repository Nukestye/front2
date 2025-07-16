import { Fragment, useEffect, useState } from "react";
import { createPortal } from 'react-dom';
import './css/blog-card.css';

import Blog from "./Blog";

import { NotificationPopup } from './NotificationPopup';

import common from '../util/common.json';

function BlogList({limit=2, nolimit=false}) {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [blogs, setBlogs] = useState([]);    

    useEffect(() => {
        setLoading(true);
        const {REACT_APP_BACKEND_URL, REACT_APP_BACKEND_PORT} = process.env;

        fetch(`http://${REACT_APP_BACKEND_URL}:${REACT_APP_BACKEND_PORT}/blogs/`)
        
            .then((response) => {return response.json()})
            .then((json) => {
                if (json['status'] != 200) throw Error('Unknown error occured');

                setBlogs(json['blogs']);
                setLoading(false);
                setOpen(false);
            }).catch(error => {
                if (common.dev.CONSOLE_DEBUG) console.error(`[REACT][BlogList] Blog list not loading \n ${error}`);
                setLoading(false);
                setOpen(true);
            });
    }, [])    

    let list = Array
            .from(blogs)
            .map(blog => <Blog className='right'
                            id={blog.id}
                            title={blog.title} 
                            url={blog.url}
                            likes={blog.likes}
                            comments={blog.comments}
                            views={blog.views}
                        />);

    if (list.length === 0) {
        list = (<div className="empty-project">There is nothing to see here... yet</div>)
    }
    else {
        if (!nolimit) list = list.slice(0, limit);
    } 


    return (
        <div className="blog-list">
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
            {list}
        </div>
    )
}

export default BlogList;