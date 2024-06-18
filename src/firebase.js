import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2CaCf6R6TolyzJatrjS76q_SVFSHW_kc",
  authDomain: "shop-80cd5.firebaseapp.com",
  projectId: "shop-80cd5",
  storageBucket: "shop-80cd5.appspot.com",
  messagingSenderId: "511420188280",
  appId: "1:511420188280:web:a0cf460d99f12198bc8f8d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
export const auth = getAuth(app);

export default app;
