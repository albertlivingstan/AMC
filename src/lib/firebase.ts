import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

let app: any = null;
let dbInstance: any = null;
let authInstance: any = null;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  dbInstance = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
  authInstance = getAuth(app);
} catch (e) {
  console.warn("Firebase initialization warning:", e);
}

export const db = dbInstance;
export const auth = authInstance;
