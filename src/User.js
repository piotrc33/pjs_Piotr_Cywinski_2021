import React from 'react';
import './User.css';
import { Link } from 'react-router-dom';

function User(){
    return(
        <div className="user">
            <div className="image">

            </div>
            <Link to="/login">
            <p>
                Zaloguj się
            </p>
            </Link>
        </div>
        
    );
}

export default User;