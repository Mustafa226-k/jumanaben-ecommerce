import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1ioK0NNf1cba4y9Hl2yDW5MsPyEC4QJ4",
  authDomain: "mustafa-collection.firebaseapp.com",
  projectId: "mustafa-collection",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth , googleProvider  };
export default app
