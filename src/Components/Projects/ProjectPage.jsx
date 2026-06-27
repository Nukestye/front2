
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPortal } from "react-dom";

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeReact from 'rehype-react'
import remarkHtml from 'remark-html'
import rehypeRaw from 'rehype-raw'

import '../css/ProjectPage.css';

import common from '../../util/common.json';

function ProjectPage({pId}) {

    let {id} = useParams();

    const [project, setProject] = useState({});
    const [readmeContent, setReadmeContent] = useState();

    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);


    const navigate = useNavigate();

    // TODO: Replace redirect with custom project pages
    // Currently redirecting to repo URL
    // Future: Fetch and render project-specific markdown/jsx content
    // stored in backend to create a unique pages

    // if we are passing an id; we use that id instead of url id
    if (typeof pId !== 'undefined') id = pId;

    useEffect(() => {
        setLoading(true);
        const { VITE_APP_BACKEND_URL } = import.meta.env;

        fetch(`${VITE_APP_BACKEND_URL}/api/projects/${id}`, {
            method: 'GET',
            headers: new Headers({'content-type': 'application/json'})
        })
            .then((response) => {return response.json()})
            .then((json) => {
                if (json['status'] === 404) navigate('/Not-Found');
                else if (json['status'] !== 200) throw Error('Unknown error occurred');

                // redirect to repo
                window.location.href = json['data']['repo'];

                setProject(json['data']);
                setLoaded(true);
                setLoading(false);
            })
            .catch((error) => {
                if (common.dev.CONSOLE_DEBUG) console.error(`[REACT][ProjectPage] Project  not loading \n ${error}`);
                setLoaded(false);
                setLoading(false);
            })

    }, [id, navigate])



    useEffect(() => {
        if (!('readme' in project)) return;

        fetch(project['readme'])
            .then((response) => { return response.text()})
            .then((json) => {
                setReadmeContent(json);
            })

    }, [project])

    return (loaded ? 
        <div className="project">
            {/* <pre>{JSON.stringify(project, null, 4)}</pre> */}
            {loading ? createPortal(
                <Fragment>
                    <div className='popup'>
                        <div className='spinner'></div>
                    </div>
                </Fragment>, document.body
                ) : null}
            {/* Wait till the project is loaded before displaying content */}
            <a href="/projects" referrerPolicy="no-referrer" target="_self"> &lt;- back to projects</a>
            <h1 className="name">{project['name']}</h1>
            <p className="description">{project['description']}</p>
            <div className="info">
                <span className="plum">{project['stage']} </span>
                -
                <span> v{project['version']} </span>
                -
                <span> {project['views']}</span>
            </div>

            <h2>README</h2>
            <br />
            <Markdown 
                remarkPlugins={[remarkGfm, remarkHtml]}
                rehypePlugins={[rehypeRaw, rehypeReact]}
            >
                {readmeContent}
            </Markdown>
        </div>
    : null)
}


export default ProjectPage;