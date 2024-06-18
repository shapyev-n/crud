import { useState } from "react";
import scss from "./Auth.module.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleIcon from "@mui/icons-material/Google";
import { IconButton } from "@mui/material";

const Register = () => {
  const { register, signInGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [pass, setPass] = useState("password");
  const navigate = useNavigate();

  async function signUp() {
    try {
      await register(email, password);
    } catch (error) {
      setError(error.message);
    }
  }

  console.log(error);
  return (
    <div className={scss.login}>
      <div className={scss.content}>
        <div className={scss.h1}>
          <h1>REGISTER</h1>
        </div>
        <div className={scss.inp}>
          <p>EMAIL</p>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </div>
        <div className={scss.inp}>
          <p>PASSWORD</p>
          <div className={scss.pass}>
            <input
              type={pass ? "password" : "text"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <span
              onClick={() => {
                setPass(!pass);
              }}
            >
              {pass ? (
                <VisibilityOffIcon sx={{ color: "#fff" }} />
              ) : (
                <VisibilityIcon sx={{ color: "#fff" }} />
              )}
            </span>
          </div>
        </div>
        <div className={scss.btns}>
          <button onClick={() => signUp()}>SIGN UP</button>
          <IconButton className={scss.google} onClick={() => signInGoogle()}>
            <GoogleIcon sx={{ cursor: "pointer" }} />
          </IconButton>
        </div>
      </div>
      <div className={scss.info}>
        <span>Do you have an account?</span>
        <p
          onClick={() => {
            navigate("/loginClient");
          }}
        >
          Sign In!
        </p>
      </div>
    </div>
  );
};

export default Register;
