
import { useEffect } from "react";
import Project from "./Project";

import common from './../util/common.json';

function ProjectList({limit = 2, nolimit=false}) {
    
    /*
    -- IMPORTANT --
    Each Project **must** have the following attributes:
    - id: a unique six alphanumeric string that is used to identify the project
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

    let projectList = [
        {
            'id': 'asd',
            'name': 'a project name',
            'description': 'this isa desc',
            'project_url': '/p/asd',
            'repo_url': '/p/dsds',
        },
        {
            'id': 'asd',
            'name': 'a project name',
            'description': 'this isa desc',
            'project_url': '/p/asd',
            'repo_url': '/p/dsds',
        },
        {
            'id': 'asd',
            'name': 'a project name',
            'description': 'this isa desc',
            'project_url': '/p/asd',
            'repo_url': '/p/dsds',
        },
        {
            'id': 'asd',
            'name': 'a project name',
            'description': 'this isa desc',
            'project_url': '/p/asd',
            'repo_url': '/p/dsds',
        },
        {
            'id': 'asd',
            'name': 'a project name',
            'description': 'this isa desc',
            'project_url': '/p/asd',
            'repo_url': '/p/dsds',
        },
    ];


    useEffect(() => {
        fetch(`https://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/projects/all`)
            .then(response => {return response.json()})
            .then(json => {
                // TODO: add backend url
                // result should only include id and project
                // unless authenticated
            })
            .catch(error => {
                if (common.dev.CONSOLE_DEBUG) console.error(`[REACT][ProjectList] Fetching Projects failed:\n ${error}`);
            })
    }, [])

    let list = Array
                .from(projectList)
                .map(project => <Project className='right'
                                    id={project.id}
                                    name={project.name} 
                                    desc={project.description} 
                                    project_url={project.project_url}
                                    icon={project.icon_url}
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