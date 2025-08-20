import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseVariables } from "./config";

const firebaseConfig = {
    apiKey: firebaseVariables.apiKey,
  authDomain: firebaseVariables.authDomain,
  projectId: firebaseVariables.projectId,
  storageBucket: firebaseVariables.storageBucket,
  messagingSenderId: firebaseVariables.messagingSenderId,
  appId:firebaseVariables.appId,

};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

