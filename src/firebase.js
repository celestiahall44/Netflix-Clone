import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut } from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0I3m4ktblXISdUlCA4rnu2zpv8YpJR4E",
  authDomain: "netflix-clone-bd4f3.firebaseapp.com",
  projectId: "netflix-clone-bd4f3",
  storageBucket: "netflix-clone-bd4f3.firebasestorage.app",
  messagingSenderId: "209825545705",
  appId: "1:209825545705:web:6b66b217f020c884575f78"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        alert(error); 
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};