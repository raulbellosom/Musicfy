import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAJYUso0stupCL6IDi-X19Kxqulx3Yjte8",
  authDomain: "promusic-27797.firebaseapp.com",
  projectId: "promusic-27797",
  storageBucket: "promusic-27797.appspot.com",
  messagingSenderId: "529458072496",
  appId: "1:529458072496:web:9a21caeba9561a57d76475",
  measurementId: "G-WZDZZ3XPCW",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
