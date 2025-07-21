
import { Fragment, useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { createPortal } from "react-dom";

import './css/ProjectPage.css';

import common from '../util/common.json';

function ProjectPage({pId}) {

    let {id} = useParams();

    const [project, setProject] = useState();

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
        const {REACT_APP_BACKEND_URL, REACT_APP_BACKEND_PORT} = process.env;

        fetch(`http://${REACT_APP_BACKEND_URL}:${REACT_APP_BACKEND_PORT}/projects/get-project`, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({projectId: id})
        })
            .then((response) => {return response.json()})
            .then((json) => {
                if (json['status'] === 404) navigate('/Not-Found');
                else if (json['status'] !== 200) throw Error('Unknown error occurred');
                console.log(json['data']['repo']);
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


    return (loaded ? 
        <div className="project">
            <pre>{JSON.stringify(project, null, 4)}</pre>
            {loading ? createPortal(
                <Fragment>
                    <div className='popup'>
                        <div className='spinner'></div>
                    </div>
                </Fragment>, document.body
                ) : null}
            {/* Wait till the project is loaded before displaying content */}       
        </div>
    : null)
}


export default ProjectPage;