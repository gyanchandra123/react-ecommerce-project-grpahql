import firebase from "firebase/compat/app"; // we are pulling the firebase utility library with this.
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyA2lAejPRWQmO5AAi3JYylIw1zIyUXHt7M",
  authDomain: "crwn-clothing-bd.firebaseapp.com",
  projectId: "crwn-clothing-bd",
  storageBucket: "crwn-clothing-bd.appspot.com",
  messagingSenderId: "210614238579",
  appId: "1:210614238579:web:9f2684e710c847c565d906",
  measurementId: "G-84JP1QXC0V",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  console.log("snapshot", snapshot);

  if (!snapshot.exists) { 
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error in creating users ", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// for google authentication purpose :

const provider = new firebase.auth.GoogleAuthProvider(); // it gives access to the googleAuthProvider class.
provider.setCustomParameters({ prompt: "select_account" }); // to always trigger the google auth pop-up, when we use the googleAuthProvider
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
