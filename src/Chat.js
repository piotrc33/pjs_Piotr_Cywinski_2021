import "./Chat.css"
import fire from './fire';

function Chat(props) {
    const db = fire.firestore();
    const messagesRef = db.collection("chats").doc("messages");
    const user = props.user;

    const sendMessage = () => {
        messagesRef.set({
            from: user,
            to: "kondziu",
            text: "może działa xddd"
        },{merge: true});
        console.log("hejka");
    };

    const handleBack = () => {
        props.setChatView("all");
    }

    return (
        <div className="single-chat">

            <nav><button onClick={handleBack} >Go back</button></nav>


            {/* tu najpierw podać id na ktore chcemy wysłać */}
            <label>To:</label>
            <input 
                type="text" 
                className="to"
                value={props.to}
            />

            <label>Message:</label>
            <input 
                type="text" 
                className="message"
            />

            <button 
                type="submit"
                onClick={sendMessage}
            >send</button>

        </div>
    )
}

export default Chat
