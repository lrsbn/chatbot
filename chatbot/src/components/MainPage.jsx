import React, { useState } from 'react';
import { chatbot } from './chatbotResponder';
import { ChatMessage } from './ChatMessage';
import { idGenerator } from './utils';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const MainPage = () => {

    // States
    const [currentMessage, setCurrentMessage] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    const dummy = React.useRef();
    const [error, setError] = useState("");
    const {currentUser, logout} = useAuth();
    const history = useHistory();

    // Wenn der Chatbot das erste mal aufgerufen wird, dann wird eine "Begrüßung" geschrieben
    React.useEffect(() => {
        setMessages([chatbot.initialMessage()]);
    }, []);

    // Wenn eine neue Message geschrieben wird, dann wird dahin geschrieben
    React.useEffect(() => {
        dummy.current.scrollIntoView({behavior: "smooth"});
    },[messages]);

    // Wenn eine Nachricht abgeschickt wird, dann wird diese überprüft und an den Chatbot weitergegeben
    const submitMessage = async (e) => {
        e.preventDefault();
        if (currentMessage.trim() === "") {
            return setCurrentMessage("");
        }
        const buildMessage = {
            text: currentMessage || "",
            key: idGenerator.next().value,
            sentByMe: true
        }
        setCurrentMessage("");
        
        const responseMessages = await chatbot.ask(buildMessage);
        setMessages([...messages, buildMessage, ...responseMessages]);

        dummy.current.scrollIntoView({ behavior: "smooth"});
    }
    
    // Wenn der Logout Button gedrückt wird, wird ausgeloggt
    const handleLogout = () => {
        setError('');
        logout().then(() => {
            history.push("/login");
        }).catch(() => {
            setError("Failed to log out");
        });
    }


    return(
        <div className="chatbot">
            <div className="content">
                <div className="user-information">
                    <h1>Chatbot</h1>
                    <div className="log-out-btn">
                        <button onClick={handleLogout}>Log out</button>
                    </div>
                    {error && <div className="errors">{error}</div>}
                </div>
                <div className="user-email">Currently Logged in as: {currentUser.email}</div>
            
                <div className="chat-room">
                    {messages && messages.map(msg => {
                        return <ChatMessage key={msg.key} message={msg} />
                    })}
                    <span ref={dummy} />
                </div>
                <form className="inputForm" onSubmit={submitMessage} >
                    <input className="inputField" value={currentMessage} type="text" placeholder="Ask Something" onChange={(e) => setCurrentMessage(e.target.value)} />
                    <button className="inputButton" type="submit" disabled={!currentMessage}><i className="pi pi-send"/></button>
                </form>
            </div>
        </div>
    )
}

export default MainPage