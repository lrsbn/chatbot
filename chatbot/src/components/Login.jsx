import React, { useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/")
        } catch {
            setError("There was an error logging in");
        }
        setLoading(false)
    }

    return(
        <div className="signup">
            <div className="signup-card">
                <h1 className="signup-title">Login</h1>
                {error && <div className="errors">{error}</div>}
                <form className="signup-form" onSubmit={submitLogin}>
                    <label htmlFor="email-input">Email: </label>
                    <input id="email-input" type="email" placeholder="Email" ref={emailRef} required />
                    <label htmlFor="password-input">Password: </label>
                    <input id="password-input" type="password" placeholder="Password" ref={passwordRef} required />
                    <button disabled={loading} className="submit-btn" type="submit">Login</button>
                </form>
            <div>Don't have an Account? <NavLink className="login-href" to="/signup">Sign Up</NavLink></div>
            </div>
        </div>
    )
        
}