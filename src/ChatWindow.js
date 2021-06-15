import React from 'react';
import './ChatWindow.css'
import { useState, useEffect } from 'react';
import Chat from "./Chat.js";
import fire from "firebase/app"
import { arrowFunctionExpression } from '@babel/types';


function ChatWindow(props) {
    const db = fire.firestore();
    const messagesRef = db.collection("chats").doc("messages");
    const usersRef = db.collection("users");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]); // tablica wszystkich użytkowników
    const [renderedItems, setRenderedItems] = useState(''); // tablica wszystkich użytkowników
    const [usersToRender, setUsersToRender] = useState([]); 
    const { nazwa:user, chatView, handleChatView:setChatView, to, setTo, toId, setToId} = props;
 
    // let chats = [
    //     {
    //         nick: "kondziu",
    //         imageUrl: "https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=14a95b5026c1567b823629ba35c40aa0",
    //         desc: "wisi mi 5 ziko",
    //     }
    // ]

    const getMessages = () => {
        messagesRef.get().then(doc => {
            const allMessages = doc.data().all;
            setMessages(allMessages);
        });
    }

    useEffect(() => {
        usersRef.get().then(doc => {
            //console.log(doc);
            setUsers(doc.docs);
        })    
    }, [])

    // załadowanie wiadomości przy wywołaniu komponentu
    useEffect(() => {
        getMessages();
    }, [])

    useEffect(() => {
        const msgRefresh = setInterval(() => {getMessages()}, 10000);
        return () => {
            clearInterval(msgRefresh);
        }
    }, [])

    useEffect(() => {
        // Ustalenie listy użytkowników z którymi kiedykolwiek się pisało
        const uarr = [];
        messages.map(mes => {
            const from = mes.from;// kto wyslal wiadomosc
            const toUser = mes.to;// do kogo wiadomosc zostala przyslana          
            // jeżeli wiadomość pochodzi od użytkownika
            if (from == user || toUser == user){
                // teraz trzeba znaleźć dokument użytkownika, który to wysłał
                users.forEach(u => {
                    // sprawdza każdego użytkownika
                    // jeżeli id aktualnego dokumentu pasuje do użytkownika, który był odbiorcą lub nadawcą lub jeśli napisał sam do siebie
                    if( (u.id == toUser && toUser != user) || (u.id == from && from != user) || (u.id == from && u.id == toUser) ){
                        // jeżelie dotąd nie zawiera
                        if(!uarr.includes(u))
                            uarr.push(u);
                    }
                })
            }
        })
        // console.log("Aktualny użytkownik: " + user)
        // console.log(messages);
        // console.log(uarr)
        setUsersToRender(uarr);
    }, [users, messages]);


    switch (chatView) {
        case "all":
            return (
                <div className="chat-window">
                    <p id="info">Your recent chats</p>

                    {
                        // wypisywanie użytkowników z którymi się kiedykolwiek pisało
                        usersToRender.map(u => {
                            //console.log(u);
                            return (<div key={u.id} className="chat" onClick={() => {
                                setChatView("chat");
                                setTo(u.data().nick)
                                setToId(u.id)
                            }} >
                                <img className="min-user-img" src={u.data().imageUrl} />
                                <p className="chat-username">{u.data().nick}</p>
                                <p className="userDesc">{u.data().desc}</p>
                            </div>)
                        })
                    }

                    {/* <div className="chat" onClick={() => {
                        setChatView("chat");
                        setTo("kondziu");
                    }}>
                        <img className="min-user-img" src="https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=14a95b5026c1567b823629ba35c40aa0" />
                        <p className="chat-username"> {chats[0].nick} </p>
                        <p className="userDesc" > hejka </p>
                    </div>

                    <div className="chat" onClick={() => setChatView("chat")} >
                        <img className="min-user-img" src="https://img-ovh-cloud.zszywka.pl/0/0088/5872-cat-pictures-cat-breeds-funny-cat-l.jpg" />
                        <p className="chat-username"> mati</p>
                        <p className="userDesc" >mój dobry znajomy</p>
                    </div> */}

                </div>
            );
        case "chat":
            return (
                <div className="chat-window">
                    <Chat to={to} toId={toId} setChatView={setChatView} user={user} messages={messages} setMessages={setMessages} />      
                </div>
            );
        case "none":
            return(
                
                <div className="chat-window">
                    <h1 style={{margin: "auto"}} >Please sign in to see Your messages</h1>
                </div>
            );

    }
}

export default ChatWindow;