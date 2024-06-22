import { useState } from "react";
import scss from "./Auth.module.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../context/AuthContext";
import img from "./registerImg.png";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, signInGoogle } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [checkboxsed, setCheckbox] = useState(true);
  const [error, setError] = useState("");

  const [pass, setPass] = useState("password");
  const navigate = useNavigate();

  async function signUp() {
    try {
      await register(firstName, lastName, email, password);
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
      <div id={scss.register}>
    <div className="container">
      <div className={scss.register}>
        <div className={scss.content}>
          <div className={scss.box}>
            <div className={scss.txt}>
              <h1>Register Yourself</h1>
              <p>Begin your journey with us today</p>
            </div>
            <div className={scss.inps}>
              <div className={scss.inp}>
                <p>First Name</p>
                <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className={scss.inp}>
                <p>Last Name</p>
                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className={scss.inp}>
              <p>Email</p>
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
                  onChange={(e) => setPassword(e.target.value)}
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
                )}
                <p>
                  I accept the <span>Terms & Conditions</span>
                </p>
              </div>
            </div>
            <div className={scss.btns}>
              {!firstName || !lastName || !email || !password || checkboxsed ? (
                <button
                  disabled
                  style={{ background: "grey", cursor: "default" }}
                >
                  sign up
                </button>
              ) : (
                <button
                  className={scss.button}
                  onClick={() => {
                    signUp();
                  }}
                >
                  sign up
                </button>
              )}
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
              Already signed up ?
              <span onClick={() => navigate("/login")}>Click Here</span>
            </p>
          </div>
        </div>
        <div className={scss.box}>
          <div className={scss.circle}></div>
          <div className={scss.img}>
            <img src={img} alt="image" />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
