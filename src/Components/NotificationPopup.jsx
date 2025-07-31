import { Fragment, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import './css/popup.css';
import './css/notification.css';

import { convertTimeToMilliseconds } from '../util/util';

import { FaTimes } from 'react-icons/fa';

export function NotificationPopup({
    title='',
    message='this is a notification',
    timeout='5s'}) {

    const [open, setOpen] = useState(true);
    const [progressbar, setWidth] = useState(0);
    
    const ms = convertTimeToMilliseconds(timeout);

    useEffect(() => {
        const updateInterval = 50;
        const incrementPerUpdate = (100 / ms) * updateInterval;

        const progressTimer = setInterval(() => {
            setWidth(prev => {
                const newWidth = prev + incrementPerUpdate;

                if (newWidth > 100) {
                    clearInterval(progressTimer);
                    setOpen(false);
                    return 100;
                }

                return newWidth;
            });
        }, updateInterval);

        return () => clearInterval(progressTimer);
    })

    return ( open ? createPortal(
            <Fragment>
                <div className='popup-notifi'>
                    <div className='notification-content'>
                        <div className='notifi-title-group'>
                            <div className='notifi-title'>
                                {title}
                            </div>
                            <div className='notifi-close'>
                                <FaTimes onClick={() => {setOpen(false);}}/>
                            </div>
                        </div>
                        <div className='notifi-content'>
                            {message}
                        </div>
                        <div className='progressbar-holder'>
                            <div className='notifi-progressbar' style={{width: `${progressbar}%`}}></div>
                        </div>
                    </div>
                </div>
            </Fragment>, document.body
        ) : null
    )
}