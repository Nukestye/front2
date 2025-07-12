
import { FaEye } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaCommentDots } from "react-icons/fa6";

import './css/blog-card.css';

function Blog({
    id,
    title,
    url,
    likes,
    comments,
    views
}) {

    let tags = ['Java', 'Limitless', 'Eye'];
    let tagCode = Array
                    .from(tags)
                    .map(tag => <span className="tag" data-tag={tag}></span>);

    return (
        <div className="blog card boxshadow hvr-ripple-out">
            <div className="blog-content">
                <div className="blog-title">
                    <a href={url}>{title}</a>
                </div>
                <div className="tags">
                    {tagCode}
                </div>
                <div className="blog-attr">
                    <span>
                        {views}
                        <FaEye />
                    </span>
                    <span>
                        {likes}
                        <FcLike />
                    </span>
                    <span>
                        {comments}
                        <FaCommentDots />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Blog;
