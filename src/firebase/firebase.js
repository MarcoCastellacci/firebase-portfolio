// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    query,
    where,
    setDoc,
    deleteDoc,
} from 'firebase/firestore';
import {
    getStorage,
    ref,
    uploadBytes,
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

const storage = getStorage(app);

export async function userExist(uid) {
    try {
        const docRef = doc(db, 'users', uid);
        const res = await getDoc(docRef);
        // console.log(res);
        return res.exists();
    } catch (err) {
        console.error(err);
    }
}
export async function userNameExist(username) {
    const users = [];
    try {
        const docsRef = collection(db, 'users')
        const q = query(docsRef, where('displayName', '==', username));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });

        return users.length > 0 ? users[0].uid : null;
    } catch (error) {
        console.error(error);
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

export async function getUserInfo(uid) {
    try {
        const docRef = doc(db, "users", uid)
        const document = await getDoc(docRef)
        return document.data();
    } catch (error) {
        console.error(error);
    }
}

export async function insertNewInfo(data) {
    try {
        if (data.categorie === "proyects") {
            const docRef = collection(db, "proyects")
            const res = await addDoc(docRef, data)
            return res
        } else if (data.categorie === "technologies") {
            const docRef = collection(db, "technologies")
            const res = await addDoc(docRef, data)
            return res
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getProyects(categorie) {
    const proyects = []
    try {
        const collectionRef = collection(db, "proyects")
        const querySnapshot = await getDocs(collectionRef)
        querySnapshot.forEach(doc => {
            const proyect = { ...doc.data() }
            // console.log(doc);
            proyect.docId = doc.id
            proyects.push(proyect)
        })
        return proyects
    } catch (error) {
        console.error(error);
    }
}

export async function getKnwoledge(categorie) {
    const technologies = []
    try {
        const collectionRef = collection(db, "technologies")
        const querySnapshot = await getDocs(collectionRef)
        querySnapshot.forEach(doc => {
            const tech = { ...doc.data() }
            tech.docId = doc.id
            technologies.push(tech)
        })
        return technologies
    } catch (error) {
        console.error(error);
    }
}

export async function UpdateProyect(docId, proyect) {
    try {
        if (proyect.categorie === "proyects") {
            const docRef = doc(db, "proyects", docId)
            const res = setDoc(docRef, proyect)
            return res
        } if (proyect.categorie === "technologies") {
            const docRef = doc(db, "technologies", docId)
            const res = setDoc(docRef, proyect)
            return res
        }
    } catch (error) {
        console.error(error);
    }
}

export async function DeleteProyect(docId) {
    try {
        const docRef = doc(db, "proyects", docId)
        const res = await deleteDoc(docRef)
        return res
    } catch (error) {
        console.error(error);
    }
}


export async function DeleteTechs(docId) {
    try {
        const docRef = doc(db, "technologies", docId)
        const res = await deleteDoc(docRef)
        return res
    } catch (error) {
        console.error(error);
    }
}

export async function deleteUsersCollection() {
    try {
        const usersCollectionRef = collection(db, "users"); // Ajusta la ruta de la colección según tu estructura
        // Obtiene todos los documentos dentro de la colección
        const querySnapshot = await getDocs(usersCollectionRef);

        // Elimina cada documento de la colección
        const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        return true; // Opcionalmente, puedes devolver un indicador de éxito
    } catch (error) {
        console.error(error);
    }
}

export async function setProfilePhoto(uid, file) {
    try {
        const imageRef = ref(storage, `image/${uid}`);
        const resUpload = await uploadBytes(imageRef, file);
        return resUpload
    } catch (error) {
        console.error(error);
    }
}

export async function getProfilePhoto(profilePicture) {
    try {
        const imageRef = ref(storage, profilePicture)
        const url = await getDownloadURL(imageRef)
        return url;
    } catch (error) {
        console.error(error);
    }
}

export async function getUserProfileInfo(uid) {
    const profileInfo = await getUserInfo(uid)
    const proyects = await getProyects(uid)
    return { profileInfo: profileInfo, proyects: proyects }
}

export async function logout() {
    await auth.signOut();
}