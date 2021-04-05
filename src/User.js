import React from 'react';
import './User.css';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login'

function User(){
    return(
        <div className="user">
            
            
            <Router>

                <Route exact path="/" render={() => 
                    <>
                        <div className="image"></div>
                        <Link to="/login">
                            <p>Zaloguj się</p>
                        </Link>
                    </>
                } />
                <Route path="/login" component={Login} />

            </Router>
            
            
        </div>
        
    );
}

export default User;