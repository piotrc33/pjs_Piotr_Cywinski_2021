import React from 'react';
import './User.css';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    };

    const handleSignIn = () => {
        clearErrors();
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

    const handleSignUp = () => {
        clearErrors();
        fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
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
    };

    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                setUser(user);
            }else{
                setUser('');
            }
        })
    };

    useEffect(() => {
        authListener();
    }, [])

    switch(loggedState){
        case "notLogged":
            return(
                <div className="user">
                    <div className="image">
                        <img id="user-img" src="https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=14a95b5026c1567b823629ba35c40aa0" />
                    </div>
                    <p id="username"> pioterek</p>
                    <div id="description"> nie lubie wątróbki</div>

                    <p id="signin" onClick={() => setLoggedState("signIn") }>SIGN IN</p>
                    <p id="signup" onClick={() => setLoggedState("signUp")} >SIGN UP</p>

                </div>
            );
        case "signIn":
            return(
                <div className="user">
                <div className="login"> 
                    <label>Nick</label>
                    <input type="text" className="field" name="nick" placeholder="nick" />
                    <label>Password</label>
                    <input type="password" className="field" name="password" placeholder="password" />

                    <input type="submit" value="SIGN IN!" className="btn" />

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

                <button className="btn" onClick={handleSignUp}  >SIGN UP!</button>
                {/* <input type="submit" value="SIGN UP!" className="btn" /> */}

                <p onClick={() => setLoggedState("notLogged")} >GO BACK</p> 

                </div>
                </div>
            );
    }



    // stara wersja
    // return(
    //     <div className="user">  
    //         <Router>
    //         <Route exact path="/" render={() => 
    //             <>
    //                 <div className="image">
    //                     <img id="user-img" src="https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=14a95b5026c1567b823629ba35c40aa0" />
    //                 </div>

    //                 <p id="username"> pioterek</p>
    //                 <div id="desciption"> nie lubie wątróbki</div>

    //                 <Link to="/login">
    //                     <p id="signin">SIGN IN</p>
    //                 </Link>
    //                 <Link to="/login">
    //                     <p id="signup">SIGN UP</p>
    //                 </Link>
    //             </>
    //         } />
    //         {/* <Route path="/login" component={Login} /> */}
    //         <Route path="/login" render={() => 
    //             <div className="login">                     
    //                     <input type="text" className="field" name="nick" placeholder="nick" />
    //                     <input type="password" className="field" name="password" placeholder="password" />

    //                     <input type="submit" value="LOG IN!" className="btn" />
    //                 <Link to="/" >
    //                     <p>GO BACK</p>
    //                 </Link>  
    //             </div>
    //         } />
    //         </Router>  
    //     </div>
        
    // );
}

export default User;