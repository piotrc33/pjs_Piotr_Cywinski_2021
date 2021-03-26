import React from 'react';
import Logo from './Logo.js';
import sIcon from './search-icon.png';
import "./Search.css";

function Search(){
    return(
        <div className="logo-search">
            <Logo /> 
            <form>
                <input type="text" id="field" placeholder="search for people!" />
                <button id="sButton">
                    {/* <img src={sIcon} alt="search-icon" /> */}
                </button>
            </form>
        </div>

    );
}

export default Search;