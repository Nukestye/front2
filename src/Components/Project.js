import { IconContext } from 'react-icons';
import { DiCode} from "react-icons/di";

import './css/project-card.css';
import './css/popup.css';


function Project({
    id, 
    name, 
    desc,
    project_url,
    icon
}) {

    let img = '';

    if (typeof icon == 'undefined') 
        img = (<IconContext.Provider value={{size: '40px'}}><DiCode className='icon'/></IconContext.Provider>)
    else 
        img = (<img className='icon' src={icon} width={'40px'} height={'40px'} alt='project logo'/>)

    return (
        <div id={id} className='project card boxshadow'>
            <a className='project-link' href={project_url} />
            {img}
            <div className='project-info'>
                <div className='project-title'>
                    {name}
                </div>
                <div className='project-short-desc'>
                    {desc}
                </div>
            </div>
        </div>
    )
}


export default Project;