import React from 'react';
import { chatbot } from './chatbotResponder';
import { ChatMessage } from './ChatMessage';
import { idGenerator } from './utils';

export const MainPage = () => {
    const [currentMessage, setCurrentMessage] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    const dummy = React.useRef();

    React.useEffect(() => {
        setMessages([chatbot.initialMessage()]);
    }, []);

    React.useEffect(() => {
        dummy.current.scrollIntoView({behavior: "smooth"});
    },[messages])

    const submitMessage = async (e) => {
        e.preventDefault();
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

    return(
        <div className="chatbot">
            <div className="content">
                <h1>Chatbot</h1>
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