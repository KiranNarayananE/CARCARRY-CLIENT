import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth"
import 'firebase/storage'
const firebaseConfig =  {
  apiKey: "AIzaSyBQmtxpXDT68rMFvK7n8C1VbZZbPsK-QX8",
  authDomain: "olx-clone-7a10e.firebaseapp.com",
  projectId: "olx-clone-7a10e",
  storageBucket: "olx-clone-7a10e.appspot.com",
  messagingSenderId: "754477293792",
  appId: "1:754477293792:web:d536b580b666d67a503085",
  measurementId: "G-NFDM9YJDPW"
};
let Firebase = initializeApp(firebaseConfig)
const auth = getAuth(Firebase)

export  {Firebase,auth};
