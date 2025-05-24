import {useState, useEffect} from "react";

import './css/footer.css';

import common from './../util/common.json';

import linkedinLogo from './../assests/linkedin-30.png';
import githubLogo from './../assests/GitHub_Invertocat_Light.png';
import twitterLogo from './../assests/twitter-logo-white.png';

function Footer() {

    const [version, setVersion] = useState('v1.0.0');

    useEffect(() => {
        // TODO: Add API call to update the version change
        setVersion('v1.0.0');
        if (common.dev.CONSOLE_DEBUG) console.log("[REACT][Footer] Updating Version");
        // Update version
    }, [version])

    return (
        <div className="footer">
            <hr className="max-w" />
            <div className="content">
                <div className="copyright" >gohar @ 2025</div>
                <div className="social-buttons">
                    <a href={common.prod.socials.github}>
                        <img src={githubLogo} height={20} width={20} alt="github white logo"/>
                    </a>
                    <a href={common.prod.socials.linkedin}>
                        <img src={linkedinLogo} height={20} width={20} alt="linkedin white logo"/>
                    </a>
                    <a href={common.prod.socials.twitter}>
                        <img src={twitterLogo} height={20} width={20} alt="twitter white logo"/>
                    </a>
                </div>
                <div className="version" >
                    <a href={common.prod.repo}>
                        {version}
                    </a>
                </div>
            </div>

        </div>
    )
}

export default Footer;
