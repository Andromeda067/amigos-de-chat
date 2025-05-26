import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBXG3ueiSzveXS9SLjgNzVEAPhySoJ405Q",
  authDomain: "gamersconnections.firebaseapp.com",
  projectId: "gamersconnections",
  storageBucket: "gamersconnections.appspot.com", 
  messagingSenderId: "490603957656",
  appId: "1:490603957656:web:a99c25a380c7027c4bafed",
  databaseURL: "https://gamersconnections-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

export { auth, db, rtdb };
