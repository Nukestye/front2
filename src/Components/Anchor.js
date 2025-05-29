import { useState, useEffect } from "react";

// DEBUG FILES
import common from '../util/common.json';

function Link({href, message, openNewTab = false}) {

    const [target, setTarget] = useState('_blank');
    const [clickedAmount, setClickedAmount] = useState('0');
    const [anchorId, setAnchorID] = useState('');

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
            })
            .catch(error => {
                if (common.dev.CONSOLE_DEBUG) console.error(`[REACT][Link] ID GEN ERR: ${error}`);
            });

    }, [href, message]);

    // Change based on if link is meant to open in a new tab
    useEffect(() => {
        openNewTab ? setTarget('_blank') : setTarget('_self')
    }, [openNewTab]);

    useEffect(() => {

        fetch(`http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/anchor/get-count`, 
            {
                method: 'POST',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify({id: anchorId, count: clickedAmount}),
            }
        ).then(response => {
            return response.json()
        }).then(json => {
            if (common.dev.CONSOLE_DEBUG) console.log(`[REACT][LINK] Updating Count: ${json['id']} ${json['count']}`);
                setClickedAmount(json['count']);
        }).catch(error => {
                if (common.dev.CONSOLE_DEBUG) console.error(`[REACT][Link] ID GEN ERR: ${error}`);
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