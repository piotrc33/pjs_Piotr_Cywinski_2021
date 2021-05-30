import "./Chat.css"
import fire from 'firebase/app';
import {useState} from 'react';
import {AiOutlineSend} from 'react-icons/ai';
import {HiArrowLeft} from 'react-icons/hi'

function Chat(props) {
    const db = fire.firestore();
    const messagesRef = db.collection("chats").doc("messages");
    const user = props.user;

    const [messageText, setMessageText] = useState('');
    const handleMessageUpdate = text => {
        setMessageText(text);
    };

    const sendMessage = () => {
        // messagesRef.update({
        //     messageOne: {
        //         from: user,
        //         to: "kondziu",
        //         text: messageText
        // }
        // },{merge: true});
        console.log("hejka");
        messagesRef.update({
            all: fire.firestore.FieldValue.arrayUnion({
                from: user,
                to: "kondziu",
                text: messageText
            })
        });
    };

    const handleBack = () => {
        props.setChatView("all");
    }

    return (
    <div className="single-chat">

        <nav id="navbar" >
            <button id="backBtn" onClick={handleBack} >
                <HiArrowLeft />
            </button>
            <p id="to" >
                {props.to}
            </p>
            {/* tu najpierw podać id na ktore chcemy wysłać */}
            {/* <label>To:</label>
            <input 
                type="text" 
                className="to"
                value={props.to} /> */}
        </nav>

        <div className="messages-field">
            <div className="received">

            </div>
            <div className="sent">
                
            </div>
        </div>

        <div className="send-menu">
            <input 
                id="message-input"
                type="text" 
                className="message field"
                placeholder="type here..."
                onChange={event => {handleMessageUpdate(event.target.value)}} />

            <button 
                type="submit"
                id="send-button"
                onClick={sendMessage}>
                <AiOutlineSend />
            </button>
        </div>


        
    </div>
    )
}

export default Chat
