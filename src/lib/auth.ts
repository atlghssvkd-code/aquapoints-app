'use server';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
  UserCredential,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getFirestore,
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
  const userCredential: UserCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  const userProfileRef = doc(db, 'users', user.uid, 'profile', user.uid);

  const newUser: Omit<Student, 'id' | 'avatarUrl' | 'avatarHint' | 'points' | 'currentIntake'> & { createdAt: any, dailyGoal: number } = {
    firstName: name.split(' ')[0] || '',
    lastName: name.split(' ').slice(1).join(' ') || '',
    email: user.email!,
    studentId: user.uid, // Using UID as studentId
    hydroPoints: 0,
    dailyGoal: 64, // Default daily goal in oz
    createdAt: serverTimestamp(),
  };

  // Not awaiting this, letting it run in the background
  setDoc(userProfileRef, newUser, { merge: true }).catch(async (serverError) => {
    const permissionError = new FirestorePermissionError({
      path: userProfileRef.path,
      operation: 'create',
      requestResourceData: newUser,
    });
    errorEmitter.emit('permission-error', permissionError);
    // We might still want to throw the original error or handle it
    throw serverError; 
  });

  return user;
}

export async function signOut(auth: Auth) {
  return firebaseSignOut(auth);
}
