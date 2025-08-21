import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseVariables } from "./config";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: firebaseVariables.apiKey,
  authDomain: firebaseVariables.authDomain,
  projectId: firebaseVariables.projectId,
  storageBucket: firebaseVariables.storageBucket,
  messagingSenderId: firebaseVariables.messagingSenderId,
  appId:firebaseVariables.appId,

};
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
console.log("Firebase variables:", firebaseConfig);

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

