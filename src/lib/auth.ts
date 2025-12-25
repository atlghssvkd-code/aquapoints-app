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

export function signIn(
  auth: Auth,
  email: string,
  password: string
): Promise<User> {
  return signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => userCredential.user
  );
}

export function signUp(
  auth: Auth,
  db: Firestore,
  email: string,
  password: string,
  name: string
): Promise<User> {
  return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
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

    setDoc(userProfileRef, newUser, { merge: true }).catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: userProfileRef.path,
        operation: 'create',
        requestResourceData: newUser,
      });
      errorEmitter.emit('permission-error', permissionError);
      throw serverError;
    });

    return user;
  });
}

export async function signOut(auth: Auth) {
  return firebaseSignOut(auth);
}