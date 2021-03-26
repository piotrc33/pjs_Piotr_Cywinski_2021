import React from 'react';
import Search from './Search.js';
import Footer from './Footer.js';
import User from './User.js';
import Chat from './Chat.js';
// import Logo from './Logo.js';

import './Main.css';

function Main(){
    return(
        
        <div className="body">   
            
            <Search />
            <Chat />
            <User />
            <Footer />
        </div>
        
    );
}

export default Main;