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
            })
        } catch (error) {
            console.log('error creating user', error);
        }
    }

    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, ObjectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    ObjectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    })
    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    return transformCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/plus.login');
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;