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

    // Funktion zum Einloggen
    const submitLogin = (e) => {
        e.preventDefault();
        if (!loading) {
            setError("");
            setLoading(true);
            login(emailRef.current.value, passwordRef.current.value).then(response => {
                // evtl. Toast um Successful Login anzuzeigen
                history.push("/");
            }).catch(error => {
                setError(error.code.replace("auth/", "").replace("-", " "));
            }).finally(() => {
                setLoading(false)
            })
        }
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