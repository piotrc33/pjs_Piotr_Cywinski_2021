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
    const { to, setTo, toId, setToId, handleChatView } = props;
    const [searchTerm, setSearchTerm] = useState(' ');

    // obsluguje zmiane okna chatu na klikniete wyszukiwanie
    const setChat = (toUser, toId) => {
        // oba sety przesylane do Maina
        setTo(toUser);
        setToId(toId); // przesylane do okna chatu
        handleChatView("chat");
    }

    // wyszukuje użytkowników po nicku i zwraca ich dokumenty
    const searchByNick = async (searchText) => {
        documents = [];
        const snapshot =  await usersRef
            .where("keywords", "array-contains", searchText.toLowerCase() )
            .get();
        snapshot.docs.reduce((acc, doc) => {
            const foundNick = doc.data().nick;
            if(foundNick != ''){
                documents.push(doc);
            }
            handleResults(documents);
        }, '');
    };

    // obsluguje wyswietlanie okna wyników wyszukiwania
    const handleFocus = () => {
        setSearchResultsView(!searchResultsView);
    };

    // obsluguje wypisanie wyników wyszukiwania
    const handleResults = (documents) => {
        setResults( documents.map(doc => {
            const nick = doc.data().nick; // nick z dokumentu znalezionego uzytkownika
            const docId = doc.id; // nazwa dokumentu znalezionego uzytkownika
            //console.log(docId);
            return (<div key={nick} className="result" onMouseDown={() => setChat(nick, docId)} >
                <img src={doc.data().imageUrl} alt="result-user-img" className="result-img" />
                <div className="result-nick" >{nick}</div>
                <div className="result-desc" >{doc.data().desc}</div>      
            </div>)

        }));
    };

    // zapobiega wysyłaniu zbyt dużej ilości requestów szukania
    useEffect(() => {
        // gdy komponent zostanie zmieniony
        const typingTimeout = setTimeout(() => {
            searchByNick(searchTerm);
        }, 500);
        // gdy komponent zostanie usuniety
        return () => {
            clearTimeout(typingTimeout);
        }
    }, [searchTerm])// <- co podlega sprawdzeniu updatow

    return(
    <div className="logo-search">
        <Logo /> 
        <div className="searchBox">
            <input type="text"
                id="sField"
                className="field"
                placeholder="search for people!"
                onChange={event => {
                    setSearchTerm(event.target.value);
                    //console.log(searchTerm);
                    //searchByNick(event.target.value);
                }}
                onFocus={handleFocus}
                onBlur={handleFocus}/>
            {/* {foundNicks.length ? (console.log(foundNicks)) : console.log(foundNicks.length) } */}

            <button id="sButton" >
                <FaSearch/>
            </button>

            <div id="searchResults" style={{display: searchResultsView ? "inline" : "none"}} >
                <div className="results">
                    {results}
                </div>
            </div>
        </div>
    </div>
    );
}

export default Search;