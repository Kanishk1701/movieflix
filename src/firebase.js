import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "Your-API-Key",
  authDomain: "netflix-clone-537f5.firebaseapp.com",
  projectId: "netflix-clone-537f5",
  storageBucket: "netflix-clone-537f5.firebasestorage.app",
  messagingSenderId: "646727715515",
  appId: "1:646727715515:web:18c2b916f8c5dbbaefb79e"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signup = async(name, email, password)=>{
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
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
} 

const login = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        throw error;
    }
}
const logout = ()=>{
    signOut(auth);
}

export {auth, db, signup, login, logout};
