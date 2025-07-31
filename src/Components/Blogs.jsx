import BlogList from './BlogList';

import './css/Blogs.css';

export default function Blogs() {

    return (
        <div className='blog-page'>
            <BlogList nolimit />
        </div>
    )
}