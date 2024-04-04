// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

export const firebaseConfig = {
    apiKey: "AIzaSyAzGjVvrr-PKhWa_Rq2Dz5ThH2ZvRQsdNg",
    authDomain: "adm-login-b5991.firebaseapp.com",
    projectId: "adm-login-b5991",
    storageBucket: "adm-login-b5991.appspot.com",
    messagingSenderId: "912152705164",
    appId: "1:912152705164:web:4023c2c24acdf2925d23a9",
    measurementId: "G-LDDE3WGHYT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
