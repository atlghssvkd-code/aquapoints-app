'use server';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import {getFirebaseApp} from './firebase-config';
import {doc, setDoc, getDoc, getFirestore} from 'firebase/firestore';

export async function signIn(email: string, password: string): Promise<User> {
  const auth = getAuth(getFirebaseApp());
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function signUp(email: string, password: string, name: string): Promise<User> {
    const auth = getAuth(getFirebaseApp());
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Now, let's create a user document in Firestore
    const db = getFirestore(getFirebaseApp());
    const userRef = doc(db, 'students', user.uid);

    const newStudent = {
      id: user.uid,
      name: name,
      email: user.email,
      avatarUrl: `https://picsum.photos/seed/${user.uid}/100/100`,
      avatarHint: 'student portrait',
      points: 0,
      dailyGoal: 64, // Default daily goal
      currentIntake: 0,
    };

    await setDoc(userRef, newStudent);

    return user;
}


export async function signOut() {
  const auth = getAuth(getFirebaseApp());
  return firebaseSignOut(auth);
}

export async function getCurrentUser() {
    const auth = getAuth(getFirebaseApp());
    return auth.currentUser;
}

export async function getUserProfile(userId: string) {
    const db = getFirestore(getFirebaseApp());
    const userRef = doc(db, 'students', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data();
    } else {
        return null;
    }
}
