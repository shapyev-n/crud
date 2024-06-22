import { useState } from "react";
import scss from "./Auth.module.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../context/AuthContext";
import img from "./login.png";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, signInGoogle } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [checkboxsed, setCheckbox] = useState(true);
  const [error, setError] = useState("");

  const [pass, setPass] = useState("password");
  const navigate = useNavigate();

  async function signUp() {
    try {
      await register(email || firstName, password);
    } catch (error) {
      setError(error.message);
    }
  }

  function checked() {
    if (!checkboxsed) {
      setCheckbox(true);
    } else {
      setCheckbox(false);
    }
  }

  console.log(error);
  return (
    <div className="container">
      <div className={scss.login}>
        <div className={scss.content}>
          <div className={scss.box}>
            <div className={scss.txt}>
              <h1>Welcome Back</h1>
              <p>Sign in to continue your progress</p>
            </div>
            <div className={scss.inp}>
              <p>Email / Username</p>
              <input
                className={scss.email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={scss.inp}>
              <p>Password</p>
              <div className={scss.pass}>
                <input
                  type={pass ? "password" : "text"}
                  onChange={(e) =>
                    setPassword(e.target.value) || setFirstName(e.target.value)
                  }
                />
                <span
                  onClick={() => {
                    setPass(!pass);
                  }}
                >
                  {pass ? (
                    <VisibilityOffIcon sx={{ color: "#090446" }} />
                  ) : (
                    <VisibilityIcon sx={{ color: "#090446" }} />
                  )}
                </span>
              </div>
            </div>
            <div className={scss.checkbox}>
              <div>
                {checkboxsed ? (
                  <div
                    onClick={() => checked()}
                    className={scss.checkBox}
                  ></div>
                ) : (
                  <div onClick={() => checked()} className={scss.checkBox}>
                    <span>✓</span>
                  </div>
                )}{" "}
                <p>Remember me</p>
              </div>
              <p>Forget password?</p>
            </div>
            <div className={scss.btns}>
              <button
                onClick={() => {
                  signUp();
                }}
              >
                sign in
              </button>
              <span>or</span>
              <button
                className={scss.google}
                onClick={() => {
                  signInGoogle();
                }}
              >
                sign in with google
                <GoogleIcon />
              </button>
            </div>
            <p className={scss.p}>
              Don’t have an account?
              <span onClick={() => navigate("/register")}>Register Here</span>
            </p>
          </div>
        </div>
        <div className={scss.boxLogin}>
          <div className={scss.circle}></div>
          <div className={scss.img}>
            <img src={img} alt="image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
