import {React, useState, useEffect} from 'react';
import Logo from './Logo.js';
import sIcon from './search-icon.png';
import "./Search.css";
import {FaSearch} from 'react-icons/fa';
import fire from './fire';

function Search(props){
    const db = fire.firestore();
    const usersRef = db.collection("users");
   // const [searchText, setSearchText] = useState('');
    const [searchResultsView, setSearchResultsView] = useState(false);
    const [results, setResults] = useState('');
    let documents = [];

    const setChat = (toUser) => {
        props.setTo(toUser);
        console.log(props.to);
    }

    // wyszukuje użytkowników po nicku i zwraca ich dokumenty
    const searchByNick = async (searchText) => {
        documents = [];
        const snapshot =  await usersRef
            .where("keywords", "array-contains", searchText.toLowerCase() )
            .get();
        snapshot.docs.reduce((acc, doc) => {
            const foundNick = doc.data().nick;
            //console.log(doc.data());
            if(foundNick != ''){
                documents.push(doc);
                //console.log(documents);  
            }
            handleResults(documents);
        }, '');
        //const foundNick = snapshot.data().nick;   
    };

    const handleFocus = () => {
        //setResults('');
        setSearchResultsView(!searchResultsView);
    };

    const handleResults = (documents) => {
        // tutaj zrobic mapę!!
        setResults( documents.map(doc => {
            const nick = doc.data().nick;
            // const docId = doc.id;
            //console.log(nick);
            return (<div className="result" onClick={() => setChat(nick)} >
                <img src={doc.data().imageUrl} alt="result-user-img" className="result-img" />
                <div className="result-nick" >{nick}</div>
                <div className="result-desc" >{doc.data().desc}</div>      
            </div>)

        }));
        //setResults( documents[0].data().nick);
        //console.log(documents[0].data());
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
                    //setSearchText(event.target.value);
                    searchByNick(event.target.value);
                }}
                onFocus={handleFocus}
                onBlur={handleFocus}/>
            {/* {foundNicks.length ? (console.log(foundNicks)) : console.log(foundNicks.length) } */}

            <button id="sButton" >
                <FaSearch/>
            </button>

            <div id="searchResults" style={{display: searchResultsView ? "inline" : "inline"}} >
                <div className="results">
                    {results}
                </div>
            </div>
        </div>
    </div>
    );
}

export default Search;