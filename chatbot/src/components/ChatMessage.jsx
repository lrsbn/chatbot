import React from 'react';

export const ChatMessage = (props) => {
    const {text, sentByMe} = props.message;
    return(
        <div className={`${sentByMe ? "sent" : "received"}`}>
            {text}
        </div>
    )

}