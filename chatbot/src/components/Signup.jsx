import React, {useRef, useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    // Funktion zum Registieren
    function handleSubmit(e) {
        e.preventDefault();
        if ( passwordRef.current.value !== passwordConfirmRef.current.value) return setError('Passwords do not match');
        if (passwordRef.current.value.length < 6) return setError("Password must be at least six characters long");

        if (!loading) {
            setError("");
            setLoading(true);
            signup(emailRef.current.value, passwordRef.current.value).then(response => {
                // Evtl. Toast bei erfolgreichem Signup
                history.push("/");
            }).catch(error => {
                setError(error.code.replace("auth/", "").replace("-", " "));
            }).finally(() => {
                setLoading(false);
            })
        }
    }

    return(
        <div className="signup">
            <div className="signup-card">
                <h1 className="signup-title">Sign Up</h1>
                {error && <div className="errors">{error}</div>}
                <form className="signup-form" onSubmit={handleSubmit}>
                    <label htmlFor="email-input">Email: </label>
                    <input id="email-input" type="email" placeholder="Email" ref={emailRef} required />
                    <label htmlFor="password-input">Password: </label>
                    <input id="password-input" type="password" placeholder="Password" ref={passwordRef} required />
                    <label htmlFor="confirm-password-input">Confirm Password: </label>
                    <input id="confirm-password-input" type="password" placeholder="Confirm Password" ref={passwordConfirmRef} required />
                    <button disabled={loading} className="submit-btn" type="submit">Sign Up</button>
                </form>
            <div>Already have an Account? <NavLink className="login-href" to="/login">Log In</NavLink></div>
            </div>
        </div>
    )

}