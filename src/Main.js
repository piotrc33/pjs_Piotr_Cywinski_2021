import React from 'react';
import Search from './Search.js';
import Footer from './Footer.js';
import User from './User.js';
import ChatWindow from './ChatWindow.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Login.js';


import './Main.css';
import { useState } from 'react';


function Main(){
    // przetrzymuje id użytkownika
    const [user, setUser] = useState('');
    // przetrzymuje stan chatu
    const [chatView, setChatView] = useState('none');
    const [to, setTo] = useState('');
    const [toId, setToId] = useState('');


    const handleUser = newUser => {
        setUser(newUser);
    }

    const handleChatView = chatView => {
        setChatView(chatView);
        //console.log(chatView);
    }

    return(
        <div className="body">   
            {/* w props nie mozna przekazywac obiektow */}
            <Search setTo={setTo} to={to} toId={toId} setToId={setToId} handleChatView={handleChatView} />
            <ChatWindow to={to} setTo={setTo} toId={toId} setToId={setToId} nazwa={user.uid} chatView={chatView} handleChatView={handleChatView} />
            <User user={user} handleUser={handleUser} handleChatView={handleChatView} />
            <Footer /> 
        </div>
        
    );
}

export default Main;