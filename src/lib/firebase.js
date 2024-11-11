import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCoAKkbWDpZN8ETLLQtkV4myhQmCuDHqhU",
    authDomain: "learningdestiny-b99f6.firebaseapp.com",
    projectId: "learningdestiny-b99f6",
    storageBucket: "learningdestiny-b99f6.firebasestorage.app",
    messagingSenderId: "258356127760",
    appId: "1:258356127760:web:4d6797be108291451a8295"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);