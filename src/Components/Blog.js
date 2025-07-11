
import Anchor from './Anchor';

function Blog({
    id,
    title,
    url,
    likes,
    comments,
    views
}) {

    return (
        <div className="blog card boxshadow">
            <div className="blog-title">
                <a href={url}>{title}</a>
            </div>
            <div className="blog-attr">
                <span>{views}</span>
                <span>{likes}</span>
                <span>{comments}</span>
            </div>
        </div>
    );
}

export default Blog;
