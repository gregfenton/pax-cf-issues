import * as functions from 'firebase-functions';
import {onDocumentWritten} from 'firebase-functions/v2/firestore';

//* firebase-admimn
import {initializeApp} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';

//* pax
import {BaseUser} from './models';

initializeApp();

export const onUserCreated = functions.auth.user().onCreate((user) => {
  const baseUser: BaseUser = {
    uid: user.uid,
    displayName: user.displayName || null,
    email: user.email || null,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber || null,
    photoURL: user.photoURL || null,
    creationTime: user.metadata.creationTime,
    lastSignInTime: user.metadata.lastSignInTime,
  };

  const afs = getFirestore();
  const usersDocRef = afs.doc(`users/${user.uid}`);
  return usersDocRef.set(baseUser);
});

export const onUserProfileCreated = onDocumentWritten(
  'users/{userId}',
  (event) => {
    console.log('userProfileCreated', event);
  }
);
