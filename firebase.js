import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA2EssRKGj7pr9m09Q0ys4bVbotGcuA4xM",
  authDomain: "nine1d.firebaseapp.com",
  projectId: "nine1d",
  storageBucket: "nine1d.firebasestorage.app",
  messagingSenderId: "703080586549",
  appId: "1:703080586549:web:fe60493f00d3fc7a70c07c"
};


// Initialize Firebase
initializeApp(firebaseConfig);  // Removed firebaseApp since it's not being used

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;
  
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('Error in creating user:', error.message);
    }
  }

  return userDocRef;
};
