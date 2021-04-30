import React from 'react';
import './User.css';
//import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import fire from './fire';

function User(props){
    // staty obslugujace logowanie
    const [loggedState, setLoggedState] = useState("notLogged");
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState('');
    // staty obslugujace dane uzytkownika
    const [userDesc, setUserDesc] = useState('');
    const [userImageUrl, setUserImageUrl] = useState('');
    const [userNick, setUserNick] = useState('');

    const db = fire.firestore();
    

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    };

    const handleSignIn = () => {
        console.log("logowanie");
        clearErrors();
        clearInputs();
        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {
                switch(err.code){
                    case "auth/invalid-email":             
                    case "auth/user-disabled":        
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const handleEdit = () => {
        return db.collection('users').doc(user.uid).set({
            desc: userDesc,
            imageUrl: userImageUrl,
            nick: userNick
        })
    };

    const handleSignUp = () => {
        clearErrors();
        clearInputs();
        fire
            .auth()
            .createUserWithEmailAndPassword(email, password) // tutaj trzeba bedzie dac then zeby utworzyc dokument zawierajacy informacje o uzytkowniku
            .then(cred => {
                return db.collection('users').doc(cred.user.uid).set({
                    desc: "",
                    imageUrl: "",
                    nick: ""
                });
            })
            .catch(err => {            
                switch(err.code){
                    case "auth/email-already-in-use":                   
                    case "invalid-email":                 
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const handleSignOut = () => {
        fire.auth().signOut();
        setLoggedState("notLogged");
    };

    // WSZYSTKIE DANE UAKTUALNIAJĄ SIĘ TUTAJ NA BIEŻĄCO
    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                setUser(user);
                db.collection('users').doc(user.uid).get().then(doc => {
                    setUserDesc( doc.data().desc );
                    setUserImageUrl( doc.data().imageUrl );
                    setUserNick( doc.data().nick );
                });
                setLoggedState("logged");
            }else{
                setUser('');
                setLoggedState("notLogged");
            }
        })
    };

    useEffect(() => {
        authListener();
    }, []);

    switch(loggedState){
        case "notLogged":
            return(
                <div className="user">
                    <div className="image">
                        <img id="user-img" src="https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=14a95b5026c1567b823629ba35c40aa0" />
                    </div>
                    <p id="username"> piotrek</p>
                    <div id="description"> witam wszystkich</div>

                    <p id="signin" onClick={() => setLoggedState("signIn") }>SIGN IN</p>
                    <p id="signup" onClick={() => setLoggedState("signUp")} >SIGN UP</p>

                </div>
            );
        case "signIn":
            return(
                <div className="user">
                <div className="login"> 
                    <label>Email</label>
                    <input 
                        type="text" 
                        className="field" 
                        name="email" 
                        placeholder="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="errorMsg">{emailError}</p>
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="field" 
                        name="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="errorMsg">{passwordError}</p>

                    <input onClick={handleSignIn} type="submit" value="SIGN IN!" className="btn" />

                    <p onClick={() => setLoggedState("notLogged")} >GO BACK</p> 
                </div>
                </div>
            );
        case "signUp":
            return(
                <div className="user">
                <div className="login">

                <label>Email</label>                     
                <input 
                    type="text" 
                    required 
                    value={email}
                    className="field"
                    name="email"
                    placeholder="email"
                    onChange = { e => {setEmail(e.target.value)} }
                />
                <p>{emailError}</p>

                <label>Password</label>
                <input 
                    type="password" 
                    className="field"
                    required
                    name="password" 
                    placeholder="password" 
                    value={password}
                    onChange = { e => setPassword(e.target.value)}
                />
                <p>{passwordError}</p>
                <label>Repeat Password</label>
                <input 
                    type="password" 
                    className="field" 
                    name="repeatPassword" 
                    placeholder="repeat password" 
                />

                <button className="btn" onClick={handleSignUp} >SIGN UP!</button>

                <p onClick={() => setLoggedState("notLogged")} >GO BACK</p> 

                </div>
                </div>
            );
        case "logged":
            return(
                <div className="user">
                    <div className="image">
                        <img id="user-img" src={userImageUrl} />
                    </div>
                    <p id="username"> {userNick} </p>
                    <div id="description"> {userDesc} </div>
                    <button id="editBtn" onClick={() => setLoggedState("editing")} >EDIT</button>

                    <p onClick={handleSignOut}>SIGN OUT</p>

                </div>
            );
        case "editing":
            return(
                <div className="user" >
                <div className="login">
                <label>Your Photo URL</label>                     
                <input 
                    type="text" 
                    required 
                    value={userImageUrl}
                    className="field"
                    placeholder="URL"
                    onChange = { e => {setUserImageUrl(e.target.value)} }
                />
                <label>Your Nick</label> 
                <input 
                    type="text" 
                    required 
                    value={userNick}
                    className="field"
                    placeholder="Nick"
                    onChange = { e => {setUserNick(e.target.value)} }
                />
                <label>Your Description</label> 
                <input 
                    type="text" 
                    required 
                    value={userDesc}
                    className="field"
                    placeholder="Description"
                    onChange = { e => {setUserDesc(e.target.value)} }
                />
                <button onClick={() => {
                    handleEdit();
                    setLoggedState("logged");
                }} >SAVE</button>
                </div>
                </div>
            );
        default: return;
    }

}

export default User;