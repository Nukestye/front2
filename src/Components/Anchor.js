import { useState, useEffect } from "react";

// DEBUG FILES
import common from '../util/common.json';

function Link({href, message, openNewTab = false}) {

    const [target, setTarget] = useState('_blank');
    const [clickedAmount, setClickedAmount] = useState('0');

    useEffect(() => {
        openNewTab ? setTarget('_blank') : setTarget('_self')
    }, [openNewTab])

    useEffect(() => {
        // TODO: Add support to track clicked amount.
        // Fetch API to correctly label each link
        setClickedAmount(clickedAmount)
        if (common.dev.CONSOLE_DEBUG) console.log('[REACT][LINK] Fetching API');

    }, [clickedAmount])

    return (
        <div id="a" className="link-holder">
            <a className='link underline' onClick={() => {setClickedAmount(clickedAmount + 1)}} href={href} data-clicks={clickedAmount} target={target} >{message}</a>
        </div>
    )
}

export default Link;