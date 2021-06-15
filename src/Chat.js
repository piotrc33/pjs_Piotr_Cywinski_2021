import "./Chat.css"
import fire from 'firebase/app';
import {useState, useEffect} from 'react';
import {AiOutlineSend} from 'react-icons/ai';
import {HiArrowLeft} from 'react-icons/hi'

function Chat(props) {
    const db = fire.firestore();
    const messagesRef = db.collection("chats").doc("messages");
    const { to, toId, setChatView, user, messages, setMessages } = props;
    const [messageText, setMessageText] = useState('');
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    const [lineThrough, setLineThrough] = useState(false);
    // state do przechowywania tablicy wiadomości
    // const [messages, setMessages] = useState([]);

    //const [allMessages, setAllMessages] = useState('');
    let allMessages = !!"";
    //console.log(allMessages)

    let styles = [];
    let actualTime = 0;

    // uzupelnienie styli wiadomości
    const handleStyles = () => {
        styles = [];
        if(bold) styles.push("bold ");
        if(italic) styles.push("italic ");
        if(underline) styles.push("underline ");
        if(lineThrough) styles.push("lineThrough ");
    }

    // dodanie wiadomości do aktualnego statu użytkownika po wysłaniu
    const addMessage = () => {
        //handleStyles();
        setMessages([...messages, {
            from: user,
            to: toId,
            text: messageText,
            styles: styles,
            time: actualTime
        }]);
    }

    const handleMessageUpdate = text => {
        setMessageText(text);
    };

    const sendMessage = () => {
        // dopisuje nową wiadomość w bazie danych
        actualTime = Date.now();
        handleStyles();
        messagesRef.update({
            all: fire.firestore.FieldValue.arrayUnion({
                from: user,
                to: toId,
                text: messageText,
                styles: styles,
                time: actualTime
            })
        });
        addMessage();
    };

    // funkcja zmienia widok na wszystkie chaty
    const goBack = () => {
        setChatView("all");
    }

    // useEffect(() => {
    //     messagesRef.get().then(doc => {
    //         allMessages = doc.data().all;
    //         setMessages(allMessages);
    //     });   
    // }, [])

    useEffect(() => {
        //console.log(messages);
    }, [messages])

    // let [boldActive, italicActive] = [false, false];

    // const handleBold = () => {
    //     boldActive = !boldActive;
    //     if(boldActive)
    //         styles.push("bold ");
    //     else{
    //         for(let i = 0; i < styles.length; i++){
    //             if(styles[i] === "bold ")
    //                 styles.splice(i,1)
    //         }
    //     }
    //     //console.log(styles)
    // }

    return (
    <div className="single-chat">

        <nav id="navbar" >
            <button id="backBtn" onClick={goBack} >
                <HiArrowLeft />
            </button>
            <p id="toNick" >
                {to}
            </p>
        </nav>

        

        <div className="messages-field">
            <div className="received message">
                Received message fjsdfhajksfhjksdhfjkashfjkhsdfhasjkhfjkashdfjk hasjkfhasjkfhjka sdhflsdhfjkashlfkhasdjkfhaklfhjkdashfjks dhfajsk
            </div>
            {
                
            messages.map(message => {
                // tymczasowo, trzeba sprawdzic jeden warunek czy to==user i from == user
                //console.log(message);
                const from = message.from;
                const toMes = message.to;
                const styleMes = message.styles;
                if( (from == user && toMes == toId) || (from == toId && toMes == user))
                    return (
                        <div className={(toMes == user ? "received message " : "sent message ") + styleMes.map(s => s).join('') }>{message.text}</div>
                    );
            })
            }
            
        </div>

        <div className="format-panel">
            <button className={(bold?"active ":" ") + "formatBtn"} onClick={() => setBold(!bold) } >
                <b>Bold</b></button>
            <button className={(italic?"active ":" ") + "formatBtn"} onClick={() => setItalic(!italic) }>
                <i>Italic</i></button>
            <button className={(underline?"active ":" ") + "formatBtn"} onClick={() => setUnderline(!underline) }>
                <u>Underline</u></button>
            <button className={(lineThrough?"active ":" ") + "formatBtn"} onClick={() => setLineThrough(!lineThrough) }>
                <strike>LineThrough</strike></button>
        </div>

        <div className="send-menu">
            <input 
                id="message-input"
                type="text" 
                className="field"
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
