import React from 'react';
import './Chat.css'
import { useState } from 'react';

function Chat(props) {

    
    const user = props.nazwa;
    const chatView = props.chatView;
    const setChatView = props.handleChatView;
    
    
    //setChatView("all");
    

    // zeby przełącząć się między czatami można zrobić funkcję typu handleChats
    // ktora w argumentach bedzie miala przekazywane (chats[x].name itd.) zeby je
    // pozniej wyrenderować

    let chats = [
        {
            nick: "kondziu",
            imageUrl: "https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=14a95b5026c1567b823629ba35c40aa0",
            desc: "wisi mi 5 ziko",
        }
    ]


    switch (chatView) {
        case "all":
            return (
                <div className="chat-window">
                    <p id="info">Twoje ostatnie wiadomości</p>
                    <div className="chat" onClick={() => setChatView("chat")}>
                        <img className="min-user-img" src="https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=14a95b5026c1567b823629ba35c40aa0" />
                        <p className="chat-username"> {chats[0].nick} </p>
                        <p className="userDesc" > hejka </p>
                    </div>

                    <div className="chat" onClick={() => setChatView("chat")} >
                        <img className="min-user-img" src="https://img-ovh-cloud.zszywka.pl/0/0088/5872-cat-pictures-cat-breeds-funny-cat-l.jpg" />
                        <p className="chat-username"> mati</p>
                        <p className="userDesc" >mój dobry znajomy</p>
                    </div>

                    <h1>{user}</h1>

                </div>
            );
        case "chat":
            return (
                <div className="chat-window">
                <form>
                    {/* tu najpierw podać id na ktore chcemy wysłać */}
                    <label>To:</label>
                    <input 
                        type="text" 
                        className="to"
                    />

                    <label>Message:</label>
                    <input 
                        type="text" 
                    />

                    <input 
                        type="submit"
                    />
                </form>

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

export default Chat;