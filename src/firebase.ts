import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBvBmwmDjEX2c_MyP4UhOGrrG5Bnn6Gc9Q",
    autoDomain: "heyy-d77ed.firebaseapp.com",
    projectId: "heyy-d77ed",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };


