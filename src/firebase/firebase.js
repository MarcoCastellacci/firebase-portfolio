// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {
    getFirestore,
    // eslint-disable-next-line
    collection,
    // eslint-disable-next-line
    addDoc,
    // eslint-disable-next-line
    getDocs,
    doc,
    getDoc,
    // eslint-disable-next-line
    query,
    // eslint-disable-next-line
    where,
    // eslint-disable-next-line
    setDoc,
    // eslint-disable-next-line
    deleteDoc
} from 'firebase/firestore';
import {
    getStorage,
    // eslint-disable-next-line
    ref,
    // eslint-disable-next-line
    uploadBytes,
    // eslint-disable-next-line
    getDownloadURL,
    // eslint-disable-next-line
    getBytes
} from 'firebase/storage'


const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: "portfolio-marco",
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MESSUREMENTID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
// eslint-disable-next-line
const storage = getStorage(app);

export async function userExist(uid) {
    try {
        const docRef = doc(db, 'users', uid);
        const res = await getDoc(docRef);
        console.log(res);
        return res.exists();
    } catch (err) {
        console.error(err);
    }
}

export async function ConfirmEmail(email) {
    const users = [];
    try {
        const docsRef = collection(db, 'users')
        const q = query(docsRef, where('email_confirmed', '==', email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });

        return users.length > 0 ? users[0].uid : null;
    } catch (error) {
        console.error(error);
    }
}

export async function RegsiterNewUser(user) {
    try {
        const collectionRef = collection(db, 'users')
        const docRef = doc(collectionRef, user.uid)
        await setDoc(docRef, user)
    } catch (error) {
        console.error(error);
    }
}

export async function UpdateUser(user) {
    try {
        const collectionRef = collection(db, 'users')
        const docRef = doc(collectionRef, user.uid)
        await setDoc(docRef, user)
    } catch (error) {
        console.error(error);
    }
}

export async function getUserInfo(uid){
    try {
        const docRef = doc(db, "users", uid)
        const document = await getDoc(docRef)

        return document.data();
    } catch (error) {
        console.error(error);
    }
}