import { useState } from "react";
import scss from "./Footer.module.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { useAuth } from "../../../context/AuthContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useProduct } from "../../../context/ProductContext";

const Footer = () => {
  const { user, register } = useAuth();
  const { addComment } = useProduct();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [pass, setPass] = useState("password");
  const [reg, setReg] = useState(false);
  const [value, setValue] = useState("");

  function next() {
    if (email && !reg) {
      setReg(true);
    } else {
      setReg(false);
    }
  }

  async function signUp() {
    try {
      await register(email, password);
    } catch (error) {
      setError(error.message);
    }
  }

  function handleInp(e) {
    setValue(e.target.value);
  }
  const date = new Date();

  function handleAddComment() {
    if (value.trim() === "") return;

    const newComment = {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      txt: value,
      id: Date.now(),
      date: date.toLocaleString(),
    };
    addComment(newComment);
    setValue("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleAddComment();
    }
  }

  console.log(error);
  return (
    <footer className={scss.footer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.left}>
            <h2>OFFERS AND TRENDS</h2>
            <h1>Newsletter Application</h1>
            <p>
              Enter your email address and let us notify you about news and
              discounts...
            </p>
            {user ? (
              <div className={scss.signUp}>
                <input
                  onChange={handleInp}
                  onKeyDown={handleKeyPress}
                  type="text"
                  placeholder="leave feedback"
                  value={value}
                />
                <button
                  onClick={() => {
                    handleAddComment();
                  }}
                >
                  SEND
                </button>
              </div>
            ) : (
              <div className={scss.signUp}>
                {!reg ? (
                  <>
                    <input
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      name=""
                      id=""
                      placeholder="example@gmail.com"
                    />
                    <button
                      onClick={() => {
                        next();
                      }}
                    >
                      ENTER PASSWORD
                    </button>
                  </>
                ) : (
                  <>
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
                          <VisibilityOffIcon sx={{ color: "#090446" }} />
                        ) : (
                          <VisibilityIcon sx={{ color: "#090446" }} />
                        )}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        signUp();
                        next();
                      }}
                    >
                      SIGN UP
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <div className={scss.right}>
            <h2>STAY UP TO DATE</h2>
            <h1>Follow Us</h1>
            <p>
              Become part of our friends on social networks and find out first
              about the discounts and novelties that we announce...
            </p>
            <div className={scss.btns}>
              <InstagramIcon sx={{ width: "60px", height: "60px" }} />
              <FacebookOutlinedIcon sx={{ width: "60px", height: "60px" }} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
