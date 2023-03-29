import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// Export the auth instance and a function for sign in with Google popup
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Database for firestore
export const db = getFirestore();

export const createUserDocumentAuth = async (userAuth) => {
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
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  //   if user data exists
  return userDocRef;
  //
};
