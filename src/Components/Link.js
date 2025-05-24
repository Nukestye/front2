import { click } from "@testing-library/user-event/dist/click";
import React, { useState, useEffect } from "react";

function Link({href, message, openNewTab = false}) {

    const [target, setTarget] = useState('_blank');
    const [clickedAmount, setClickedAmount] = useState(0);

    useEffect(() => {
        openNewTab ? setTarget('_blank') : setTarget('_self')
    }, [openNewTab])



    return (
        <div className="link-holder">
            <a className='link' onClick={() => {setClickedAmount(clickedAmount + 1)}} href={href} target={target} >{message}</a>
            &nbsp;
            <span className="link-num">{clickedAmount}</span>
        </div>
    )
}

export default Link;