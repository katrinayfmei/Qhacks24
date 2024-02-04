import { initializeApp } from 'firebase/app';
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCTZAb8nSnF7nzA2Oou-O2VwAEQwRCxt2c",
    authDomain: "health-app-fd2af.firebaseapp.com",
    projectId: "health-app-fd2af",
    storageBucket: "health-app-fd2af.appspot.com",
    messagingSenderId: "125481270038",
    appId: "1:125481270038:web:5132890da0b2ee5a48ee37",
    measurementId: "G-HXNFGYJE09"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export { storage };

