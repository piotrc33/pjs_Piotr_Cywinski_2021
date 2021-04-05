import React from 'react';
import Search from './Search.js';
import Footer from './Footer.js';
import User from './User.js';
import Chat from './Chat.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Login.js';

import './Main.css';

function Main(){
    return(
        
        <div className="body">   
            <Router>
                <Search />
                <Chat />
                <Route path="/login" component={Login} />
                <Route path="/" exact component={User} />
                <Footer />
            </Router>
            
        </div>
        
    );
}

export default Main;