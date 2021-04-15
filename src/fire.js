 import firebase from 'firebase';
 
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAZYP-vXBx2U_4SHe16Rx9T6S4zP-UxBfw",
    authDomain: "pro-chat-ed8a0.firebaseapp.com",
    projectId: "pro-chat-ed8a0",
    storageBucket: "pro-chat-ed8a0.appspot.com",
    messagingSenderId: "75924462548",
    appId: "1:75924462548:web:9af38635ce1facc4e55441"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;