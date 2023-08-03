import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyCxXv87JbWtj3gu758ueTtCmlGTMCjXSy4",
  authDomain: "adopt-a-pet-e49b1.firebaseapp.com",
  projectId: "adopt-a-pet-e49b1",
  storageBucket: "adopt-a-pet-e49b1.appspot.com",
  messagingSenderId: "553879913132",
  appId: "1:553879913132:web:510ac4310885dce0f61509"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) 
export const firestore = getFirestore(app) 
export const storage = getStorage(app) 