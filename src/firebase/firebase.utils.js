import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAd2u6Ruypcawjcx3zA_fUQlyVX6ciL-4M",
  authDomain: "storeella-react.firebaseapp.com",
  databaseURL: "https://storeella-react.firebaseio.com",
  projectId: "storeella-react",
  storageBucket: "storeella-react.appspot.com",
  messagingSenderId: "367159462489",
  appId: "1:367159462489:web:65ad65e44544f558acbf48",
  measurementId: "G-Q9EXBQJ6P6"
};


firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
