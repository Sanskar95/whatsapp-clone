import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC_wLO0T0-KXQfLkssHC6jcE4cnO3VXpR4",
    authDomain: "whatsapp-clone-bc3b4.firebaseapp.com",
    projectId: "whatsapp-clone-bc3b4",
    storageBucket: "whatsapp-clone-bc3b4.appspot.com",
    messagingSenderId: "347604790999",
    appId: "1:347604790999:web:a586b2dbc6b64a882e8a92"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) :  firebase.app()

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();


  export {db, auth , provider}