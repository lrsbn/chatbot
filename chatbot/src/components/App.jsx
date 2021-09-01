import React from 'react';
import { ChatMessage } from './ChatMessage';

export const App = () => {
    const messages = [
        {
            text: "Test",
            key: "1",
            sentByMe: true
        },
        {
            text: "AnotherTest",
            key: "2",
            sentByMe: false
        }
    ]

    return(
        <div className="chatbot">
            <h1>Chatbot</h1>
            <div className="content">
                {console.log(messages)}
                {messages && messages.map(msg => {
                    return <ChatMessage key={msg.key} message={msg} />
                })}
            </div>
        </div>
    )
}