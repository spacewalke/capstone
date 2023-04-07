import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Define the Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyD9i_Uvx76HMVIsuqp6Hlv1gxo5-7UT-B0",
  authDomain: "crwn-clothing-db-5f394.firebaseapp.com",
  projectId: "crwn-clothing-db-5f394",
  storageBucket: "crwn-clothing-db-5f394.appspot.com",
  messagingSenderId: "374766472544",
  appId: "1:374766472544:web:c236368f7900724b11e205",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Create a GoogleAuthProvider instance and set custom parameters
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Export the auth instance and a function for sign in with Google popup
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Database for firestore
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalinformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //   if user data does not exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalinformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  //   if user data exists
  return userDocRef;
  //
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
