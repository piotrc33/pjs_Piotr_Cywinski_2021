import React from 'react';
import './User.css';
import {useState, useEffect} from 'react';
import fire from './fire';
import {GoSignOut, GoPencil, GoSignIn, GoMail} from 'react-icons/go';
import {AiOutlineForm} from 'react-icons/ai';
import {HiArrowLeft, HiArrowRight} from 'react-icons/hi'

function User(props){
    // staty obslugujace logowanie
    const [loggedState, setLoggedState] = useState("notLogged");
    //const [user, setUser] = useState(''); // ten state przetrzymuje id uzytkownika
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
    const user = props.user;
    const setUser = (newUser) => {props.handleUser(newUser)};
    const setChatView = chatView => {
        props.handleChatView(chatView);
    };
    const defaultImg = "https://icon-library.com/images/default-profile-icon/default-profile-icon-8.jpg";
    const dogImg = "https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=14a95b5026c1567b823629ba35c40aa0";
    const lamaImg = "https://images.pb.pl/filtered/18e95587-0c6c-4a2b-9631-8cacf268517c/e445c707-1300-5bf5-bdbc-623a8c7be66a_w_830.jpg"

    const clearInputs = () => {
        setEmail('');
        setPassword('');
        setUserNick('');
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
            .then( () => {
                setChatView("all");
            })
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
        const oldMail = "mail@gmail.com";
        const newKeywords = createKeywords(userNick);
        return db.collection('users').doc(user.uid).set({
            desc: userDesc,
            imageUrl: userImageUrl,
            nick: userNick,
            email: oldMail,
            keywords: newKeywords
        })
    };

    // tworzy słowa kluczowe do wyszukiwania użytkowników
    const createKeywords = nick => {
        const array = [];
        let nextKeyword = '';
        nick.split('').forEach(letter => {
            nextKeyword += letter;
            array.push(nextKeyword);
        });
        return array;
    }

    const handleSignUp = () => {
        clearErrors();
        clearInputs();
        fire
            .auth()
            .createUserWithEmailAndPassword(email, password) // tutaj trzeba bedzie dac then zeby utworzyc dokument zawierajacy informacje o uzytkowniku
            .then(cred => {
                const nickKeywords = createKeywords(userNick);
                return db.collection('users').doc(cred.user.uid).set({
                    keywords: nickKeywords,
                    desc: "hey!",
                    imageUrl: defaultImg,
                    nick: userNick,
                    email: email
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
        setChatView("none");
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
                }).catch(err => {
                });
                setChatView("all");
                setLoggedState("logged");
            }else{
                setUser('');
                setUserNick('');
                setLoggedState("notLogged");
                setChatView("none");
            }
        })
        //console.log(user);
    };

    useEffect(() => {
        authListener();
    }, []);

    switch(loggedState){
        case "notLogged":
            return(
                <div className="user">
                    <div className="image">
                        <img id="user-img" src={dogImg} alt="starting user img" />
                    </div>
                    <p id="username">YourNickname</p>
                    <div id="description">YourDescription</div>

                    <p id="signin" className="btn" onClick={() => setLoggedState("signIn") }>
                        SIGN IN <GoSignIn />
                    </p>
                    <p id="signup" className="btn" onClick={() => setLoggedState("signUp")} >
                        SIGN UP <AiOutlineForm />
                    </p>

                </div>
            );
        case "signIn":
            return(
                <div className="user">
                <div className="login"> 
                    <label className="label">Email</label>
                    <input 
                        type="text" 
                        className="field form" 
                        name="email" 
                        placeholder="Type in email..." 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="error">{emailError}</p>
                    <label className="label">Password</label>
                    <input 
                        type="password" 
                        className="field form" 
                        name="password" 
                        placeholder="Type in password..." 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="error">{passwordError}</p>

                    <button onClick={handleSignIn} className="signIn btn" type="submit" >
                        SIGN IN! <HiArrowRight /> 
                    </button>

                    <p className="goBack btn" onClick={() => {setLoggedState("notLogged"); clearInputs(); clearErrors();}} >
                        <HiArrowLeft /> GO BACK
                    </p> 
                </div>
                </div>
            );
        case "signUp":
            return(
                <div className="user">
                <div className="login">

                <label className="label">Email</label>                     
                <input 
                    type="text" 
                    required 
                    value={email}
                    className="field form"
                    name="email"
                    placeholder="Type in email..."
                    onChange = { e => {setEmail(e.target.value)} }
                />
                <p className="error">{emailError}</p>

                
                <label className="label">Nick</label>                     
                <input 
                    type="text" 
                    required 
                    value={userNick}
                    className="field form"
                    name="nick"
                    placeholder="Type in nick..."
                    onChange = { e => {setUserNick(e.target.value)} }
                />
                {/* <p>{emailError}</p>  tu można by zrobić sprawdzenie czy nick już nie jest zajęty ale po co xDDD*/}
                <p></p>

                <label className="label">Password</label>
                <input 
                    type="password" 
                    className="field form"
                    required
                    name="password" 
                    placeholder="Type in password..." 
                    value={password}
                    onChange = { e => setPassword(e.target.value)}
                />
                <p className="error">{passwordError}</p>

                <button className="btn signUp" onClick={handleSignUp} >
                    SIGN UP! <HiArrowRight />
                </button>

                <p className="goBack btn" onClick={() => {setLoggedState("notLogged"); clearInputs(); clearErrors();}} >
                    <HiArrowLeft /> GO BACK
                </p> 

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
                    <button className="editBtn btn" onClick={() => setLoggedState("editing")} >
                        EDIT ACCOUNT <GoPencil style={{"fontSize": "1.2em"}} />
                    </button>

                    <p className="signOut btn" onClick={handleSignOut}>
                        SIGN OUT <GoSignOut />
                    </p>

                    {/* <button onClick={createKeywords()} >click</button> */}

                </div>
            );
        case "editing":
            return(
                <div className="user" >
                <div className="login">
                <label className="label">Your Photo URL</label>                     
                <input 
                    type="text" 
                    required 
                    value={userImageUrl==defaultImg?'':userImageUrl}
                    className="field form"
                    placeholder="Type in new URL..."
                    onChange = { e => {setUserImageUrl(e.target.value)} }
                />
                <label className="label">Your Nick</label> 
                <input 
                    type="text" 
                    required 
                    value={userNick}
                    className="field form"
                    placeholder="Type in new Nick..."
                    onChange = { e => {setUserNick(e.target.value)} }
                />
                <label className="label">Your Description</label> 
                <textarea 
                    type="text" 
                    required 
                    value={userDesc}
                    className="field form"
                    placeholder="Type in new Description..."
                    onChange = { e => {setUserDesc(e.target.value)} }
                />
                <br></br>
                <button className="saveBtn btn" onClick={() => {
                    handleEdit();
                    setLoggedState("logged");
                }} >SAVE</button>
                </div>

                <p className="goBack btn" onClick={() => {setLoggedState("logged");}} >
                    <HiArrowLeft /> GO BACK
                </p> 

                </div>

                
            );
        default: return;
    }

}

export default User;