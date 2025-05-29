import { useState, useEffect } from "react";

// DEBUG FILES
import common from '../util/common.json';

function Link({href, message, openNewTab = false}) {

    const [target, setTarget] = useState('_blank');
    const [clickedAmount, setClickedAmount] = useState('0');
    const [anchorId, setAnchorID] = useState('');

    // Should only run once
    // Create a unique id that will be used
    // to store the number of times its clicked.
    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/anchor/create-id`, 
            {
                method: 'POST',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify({href: href, message: message}),
            }
        )
            .then(response => {return response.json()})
            .then(json => {
                if (common.dev.CONSOLE_DEBUG) console.log(`[REACT][LINK] ID GEN: ${json['id']}`);
                setAnchorID(json['id'])
            });

    }, [href, message]);

    // Change based on if link is meant to open in a new tab
    useEffect(() => {
        openNewTab ? setTarget('_blank') : setTarget('_self')
    }, [openNewTab]);

    // TODO: Link tracking 
    // each time the link is clicked
    // it should update in db
    // could be intensive ??
    useEffect(() => {

        fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/anchor/get-count`, 
            {
                method: 'POST',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify({id: anchorId, count: clickedAmount}),
            }
        )
            .then(response => {return response.json()})
            .then(json => {
                if (common.dev.CONSOLE_DEBUG) console.log(`[REACT][LINK] Updating Count: ${json['id']} ${json['count']}`);
                setClickedAmount(json['count']);
            });

        if (common.dev.CONSOLE_DEBUG) console.log('[REACT][LINK] Fetching API');
    }, [anchorId, clickedAmount]);

    return (
        <div className="link-holder">
            <a id={anchorId} className='link underline' onClick={() => {setClickedAmount(((+clickedAmount) + 1).toString())}} href={href} data-clicks={clickedAmount} target={target} >{message}</a>
        </div>
    )
}

export default Link;