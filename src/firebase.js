import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCYh-2Y4o3kRwI8ehS0pglv8mKCCAwA_qU",
  authDomain: "twitter-clone-app-ab9f9.firebaseapp.com",
  databaseURL: "https://twitter-clone-app-ab9f9.firebaseio.com",
  projectId: "twitter-clone-app-ab9f9",
  storageBucket: "twitter-clone-app-ab9f9.appspot.com",
  messagingSenderId: "942381561108",
  appId: "1:942381561108:web:ff6e9c5390beeb2bcabe01",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export const auth = firebase.auth();

export default db;
