import { takeLatest, call, all } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';

export function* googleSignInWithGoogle() {
    try {
        alert('its working');
        const userRef = yield auth.signInWithPopup(googleProvider);
        console.log(userRef);

    } catch (error) {

    }
};

export function* googleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, googleSignInWithGoogle);

}

export function* userSagas() {
    yield all([call(googleSignInStart)]);
}