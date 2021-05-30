import {React, useState} from 'react';
import Logo from './Logo.js';
import sIcon from './search-icon.png';
import "./Search.css";
import {FaSearch} from 'react-icons/fa';
import fire from './fire';

function Search(){
    const db = fire.firestore();
    const usersRef = db.collection("users");
    const [searchText, setSearchText] = useState('');
    var foundNicks = [];
    var documents = [];

    const searchByNick = async (searchText) => {
        foundNicks = [];
        const snapshot =  await usersRef
            .where("keywords", "array-contains", searchText.toLowerCase() )
            .get();
        return snapshot.docs.reduce((acc, doc) => {
            const foundNick = doc.data().nick;
            if(foundNick != ''){
                foundNicks.push(foundNick);
                documents.push(doc);
                //console.log(documents);
            }  
        }, '');
        //const foundNick = snapshot.data().nick;   
    };

    const showSearchResults = (foundNicks) => {

    };

    return(
    <div className="logo-search">
        <Logo /> 
        <div className="searchBox">
            <input type="text"
                id="sField"
                className="field"
                placeholder="search for people!"
                onChange={event => {
                    setSearchText(event.target.value);
                    searchByNick(searchText);
            }} />
            {foundNicks.length ? (console.log(foundNicks)) : console.log(foundNicks.length) }

            <button id="sButton">
                    <FaSearch/>
            </button>
        </div>
    </div>

    );
}

export default Search;