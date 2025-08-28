import React, {useState, useEffect, Fragment} from "react";
import { createPortal } from "react-dom";

import common from '../util/common.json';
import { useNavigate } from "react-router-dom";

function Login() {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const logged_in = localStorage.getItem('is_logged');

        if (logged_in === 'yes') navigate('/back');
    }, [navigate])

    const handleChange = (e) => {
        console.log(e.target);
        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        const { REACT_APP_BACKEND_URL, REACT_APP_BACKEND_PORT } = process.env;

        fetch(`http://${REACT_APP_BACKEND_URL}:${REACT_APP_BACKEND_PORT}/auth`, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(formData),
        })
        .then((response) => {return response.json()})
        .then((json) => {

            // 401 is ambiguous to prevent knowing what is correct/uncorrect
            if (json['status'] == 401) setError('username or password is incorrect.');

            localStorage.setItem('userId', json['userId']);
            localStorage.setItem('is_logged', 'yes');
            localStorage.setItem('token', json['token']);

            // Sent user back to homepage
            navigate('/');
            setLoading(false);
        })
        .catch((error) => {
           if (common.dev.CONSOLE_DEBUG) console.error(error);
           setLoading(false);
        })
    }

    return (
        <div className="page login">
            {loading ? createPortal(
                <Fragment>
                    <div className='popup'>
                        <div className='spinner'></div>
                    </div>
                </Fragment>, document.body
                ) : null}
            <form method={"post"}>
                <label htmlFor="username" />
                <input id="username" name="username" type="text" required onChange={handleChange}/>
                
                <label htmlFor="password" />
                <input id="password" name="password" type="text" required onChange={handleChange}/>
                <button type="submit" onClick={handleSubmit} >Submit</button>
            </form>

            <div className="login error">
                {error}
            </div>
        </div>
    )
}

export default Login;