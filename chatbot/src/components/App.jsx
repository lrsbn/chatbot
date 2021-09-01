import React from 'react';
import { ChatMessage } from './ChatMessage';

export const App = () => {
    const [currentMessage, setCurrentMessage] = React.useState("");

    const messages = [
        {
            text: "Test",
            key: "test",
            sentByMe: true
        },
        {
            text: "AnotherTest",
            key: "anothertest",
            sentByMe: false
        }
    ]

    for (var i = 0; i < 17; i++) {
        messages.push({
            text: `Test${i}`,
            key: i,
            sentByMe: i % 2 === 0 ? true : false
        })
    }

    const submitMessage = () => {

    }

    return(
        <div className="chatbot">
            <div className="content">
                <h1>Chatbot</h1>
                <div className="chat-room">
                    {messages && messages.map(msg => {
                        return <ChatMessage key={msg.key} message={msg} />
                    })}
                </div>
                <form className="inputForm" onSubmit={submitMessage} >
                    <input className="inputField" value={currentMessage} type="text" placeholder="Ask Something" onChange={(e) => setCurrentMessage(e.target.value)} />
                    <button className="inputButton" type="submit" disabled={!currentMessage}><i className="pi pi-send"/></button>
                </form>
            </div>
        </div>
    )
}