import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const authContext = createContext();
export const useAuth = () => useContext(authContext);

const initial_state = {
  user: null,
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case "USER":
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

const AuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial_state);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  //   !register
  async function register(firstName, lastName, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  // !login
  function login(email, password, firstName) {
    return signInWithEmailAndPassword(auth, email || firstName, password);
  }

  //   !google
  async function signInGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  //   !get
  function getUser() {
    return onAuthStateChanged(auth, (user) =>
      dispatch({
        type: "USER",
        payload: user,
      })
    );
  }
  useEffect(() => {
    getUser();
  }, []);

  //   !logOut
  async function logOutUser() {
    return signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        alert(`An ${error} happened.`);
      });
  }

  const values = {
    user: state.user,
    register,
    login,
    signInGoogle,
    logOutUser,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContext;
