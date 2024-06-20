import { useState } from "react";
import scss from "../Auth.module.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const Form = ({ isAdmin }) => {
  const [pass, setPass] = useState("password");
  const navigate = useNavigate();

  return (
    <div className={scss.login}>
      <div className={scss.content}>
        <div className={scss.h1}>
          {isAdmin ? <h1>LOG IN AS A SELLER</h1> : <h1>WELCOME</h1>}
        </div>
        <div className={scss.inp}>
          {isAdmin ? <p>USERNAME</p> : <p>LOGIN</p>}
          <input type="text" placeholder="login" />
        </div>
        <div className={scss.inp}>
          <p>PASSWORD</p>
          <div className={scss.pass}>
            <input type={pass ? "password" : "text"} placeholder="password" />
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

        {isAdmin ? (
          <button>LOG IN AS A SELLER</button>
        ) : (
          <button>LOG IN</button>
        )}
        </div>
      </div>
      <div className={scss.info}>
        {isAdmin ? (
          <>
            <span>Not a seller?</span>
            <p
              onClick={() => {
                navigate("/loginClient");
              }}
            >
              Log In as a User and start shopping!
            </p>
          </>
        ) : (
          <>
            <span>Are you a seller?</span>
            <p
              onClick={() => {
                navigate("/loginAdmin");
              }}
            >
              Login as a seller!
            </p>
          </>
        )}
        <h3>
          Don't have an account yet?
          <p
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign up!
          </p>
        </h3>
      </div>
    </div>
  );
};

export default Form;
