import React from 'react';
import { chatbot } from './chatbotResponder';
import { ChatMessage } from './ChatMessage';
import { idGenerator } from './utils';

export const App = () => {
    const [currentMessage, setCurrentMessage] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    const dummy = React.useRef();

    // React.useEffect(() => {
    //     const initialTestMessages = [
    //         {
    //             text: "Test",
    //             key: "test",
    //             sentByMe: true
    //         },
    //         {
    //             text: "AnotherTestLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    //             key: "anothertest",
    //             sentByMe: false
    //         }
    //     ];
    //     const testMessages = [];
    //     for (var i = 0; i < 17; i++) {
    //         testMessages.push({
    //             text: `Test${i}`,
    //             key: i,
    //             sentByMe: i % 2 === 0 ? true : false
    //         })
    //     }
    //     setMessages([...initialTestMessages, ...testMessages]);
    // },[])
    
    React.useEffect(() => {
        dummy.current.scrollIntoView({behavior: "smooth"});
        // console.log(messages);
    },[messages])

    const submitMessage = async (e) => {
        e.preventDefault();
        const buildMessage = {
            text: currentMessage || "",
            key: idGenerator.next().value,
            sentByMe: true
        }
        setCurrentMessage("");
        
        const responseMessage = await chatbot.ask(buildMessage);
        // console.log(responseMessage);
        const newMessageArray = [...messages];
        newMessageArray.push(buildMessage);
        newMessageArray.push(responseMessage);
        // setMessages([...messages, buildMessage, responseMessage]);
        console.log(newMessageArray);
        setMessages(newMessageArray);

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