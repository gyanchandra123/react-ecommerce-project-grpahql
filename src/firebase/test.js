import firebase from "firebase/compat/app"; // we are pulling the firebase utility library with this.
import "firebase/compat/firestore";
import "firebase/compat/auth";


export const firestore = firebase.firestore();

firestore.collection('users').doc('t2iIaCpJgGTEumGxsuyC').collection('cardItems')
firestore.collection('users/t2iIaCpJgGTEumGxsuyC/cardItems')