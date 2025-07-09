import {useState, useEffect} from "react";

import './css/footer.css';

import common from './../util/common.json';

import { FiUser } from 'react-icons/fi';

import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin } from 'react-icons/ai';

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
            <div className="footer-content">
                <div className="copyright">

                    gohar @ 2025
                    </div>
                <div className="social-buttons" target='_self'>
                    <a href={'https://www.example.com/'}>
                        <FiUser />
                    </a>
                    <a href={common.prod.socials.github} target='_blank' rel='external noreferrer'>
                        {/* <img src={githubLogo} height={20} width={20} alt="github white logo"/> */}
                        <AiFillGithub />
                    </a>
                    <a href={common.prod.socials.linkedin} target='_blank' rel='external noreferrer'>
                        {/* <img src={linkedinLogo} height={20} width={20} alt="linkedin white logo"/> */}
                        <AiFillLinkedin />
                    </a>
                    <a href={common.prod.socials.twitter} target='_blank' rel='external noreferrer'>
                        {/* <img src={twitterLogo} height={20} width={20} alt="twitter white logo"/> */}
                        <AiOutlineTwitter />
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
