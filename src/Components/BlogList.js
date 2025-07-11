import Blog from "./Blog";

import './css/blog-card.css';

function BlogList({limit=2, nolimit=false}) {

    let bloglist = [
        {
            'id': 'asb',
            'title': 'How am I alive?',
            'url': '/b/asb',
            'likes': 100,
            'comments': 10,
            'views': 0
        },
            {
            'id': 'asb',
            'title': 'How am I alive?',
            'url': '/b/asb',
            'likes': 100,
            'comments': 10,
            'views': 0
        },
        {
            'id': 'asb',
            'title': 'How am I alive?',
            'url': '/b/asb',
            'likes': 100,
            'comments': 10,
            'views': 0
        },
                {
            'id': 'asb',
            'title': 'How am I alive?',
            'url': '/b/asb',
            'likes': 100,
            'comments': 10,
            'views': 0
        },
            {
            'id': 'asb',
            'title': 'How am I alive?',
            'url': '/b/asb',
            'likes': 100,
            'comments': 10,
            'views': 0
        },
        {
            'id': 'asb',
            'title': 'How am I alive?',
            'url': '/b/asb',
            'likes': 100,
            'comments': 10,
            'views': 0
        },
    ];


    let list = Array
            .from(bloglist)
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
            {list}
        </div>
    )
}

export default BlogList;