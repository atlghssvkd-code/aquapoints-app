'use server';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  Firestore,
  serverTimestamp,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Student } from './types';

export async function signIn(
  auth: Auth,
  email: string,
  password: string
): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function signUp(
  auth: Auth,
  db: Firestore,
  email: string,
  password: string,
  name: string
): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const userProfileRef = doc(db, 'users', user.uid, 'profile', user.uid);

  const [firstName, ...lastNameParts] = name.split(' ');
  const lastName = lastNameParts.join(' ');

  const newUser: Omit<Student, 'id' | 'currentIntake' | 'avatarUrl' | 'avatarHint'> = {
    firstName: firstName || '',
    lastName: lastName || '',
    email: user.email!,
    studentId: user.uid, // Using UID as studentId
    hydroPoints: 0,
    dailyGoal: 64, // Default daily goal in oz
  };

  const dataToWrite = { ...newUser, createdAt: serverTimestamp() };

  setDoc(userProfileRef, dataToWrite, { merge: true }).catch(async (serverError) => {
    const permissionError = new FirestorePermissionError({
      path: userProfileRef.path,
      operation: 'create',
      requestResourceData: dataToWrite,
    });
    errorEmitter.emit('permission-error', permissionError);
    // We are not re-throwing the error here to avoid an unhandled promise rejection
    // on the client. The error is already emitted for debugging.
  });

  return user;
}

export async function signOut(auth: Auth) {
  return firebaseSignOut(auth);
}
