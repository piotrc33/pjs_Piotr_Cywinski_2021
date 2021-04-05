import React from 'react';
import './Logo.css'
import logoo from "./prochat-logo.png"

function Logo(){
    return(
        <span className="logo">
            <img id="logo-img" src={logoo} alt="Logo" />
        </span>
    );
}

export default Logo;