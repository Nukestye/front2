
import { useEffect, useState } from "react";
import Project from "./Project";

import common from './../util/common.json';

function ProjectList({limit = 2, nolimit=false}) {
    
    /*
    -- IMPORTANT --
    Each Project **must** have the following attributes:
    - projectId: a unique six alphanumeric string that is used to identify the project
    - name: name of the project
    - description: a short description of the project (MAX 80 Characters)
    - project_url: link to an internal project page
    - repo_url: link to the code file

    The following attributes are optional:
    - languages: the programming languages used
    - stack: the frameworks used
    - readme_url: link to readme file
    - icon_url: icon for the project, has a default
    */

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const {REACT_APP_BACKEND_URL, REACT_APP_BACKEND_PORT} = process.env;

        fetch(`http://${REACT_APP_BACKEND_URL}:${REACT_APP_BACKEND_PORT}/projects/`)
            .then((response) => {return response.json()})
            .then ((json) => {
                if (json['status'] !== 200) throw Error('Unknown error occured');

                setProjects(json['projects']);
            })
            .catch ((error) => {
                if (common.dev.CONSOLE_DEBUG) console.error(`[REACT][ProjectList] Project list not loading \n ${error}`);
            });
    }, [])

    let list = Array
                .from(projects)
                .map(project => <Project key={project.projectId} className='right'
                                    id={project.projectId}
                                    name={project.name} 
                                    desc={project.description}
                                    icon={project.icon}
                                />);

    if (list.length === 0) {
        list = (<div className="empty-project">There is nothing to see here... yet</div>)
    }
    else {
        if (!nolimit) list = list.slice(0, limit);
    } 
        
    return (
        <div className="project-list">
            {list}
        </div>
    )
}

export default ProjectList;