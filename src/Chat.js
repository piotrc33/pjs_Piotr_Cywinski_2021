import React from 'react';
import './Chat.css'
import {useState} from 'react';

function Chat(){

    const [chatView, setChatView] = useState("all");

    // zeby przełącząć się między czatami można zrobić funkcję typu handleChats
    // ktora w argumentach bedzie miala przekazywane (chats[x].name itd.) zeby je
    // pozniej wyrenderować

    let chats = [
        {
            name: "kondziu",
            img: "https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=14a95b5026c1567b823629ba35c40aa0",
            userDesc: "wisi mi 5 ziko",
        }
    ]

    return(
        <div className="chat-window">
            <p id="info">Twoje ostatnie wiadomości</p>
            <div className="chat" onClick={setChatView}>
                <img className="min-user-img" src="https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=14a95b5026c1567b823629ba35c40aa0" />
                <p className="chat-username"> {chats[0].name} </p>
                <p className="userDesc" > wisi mi 5 ziko </p>
            </div>

            <div className="chat">
                <img className="min-user-img" src="https://img-ovh-cloud.zszywka.pl/0/0088/5872-cat-pictures-cat-breeds-funny-cat-l.jpg" />
                <p className="chat-username"> mati</p>      
            </div>
        </div>
    );
}

export default Chat;