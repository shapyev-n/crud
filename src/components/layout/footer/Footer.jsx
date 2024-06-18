import {} from "react";
import scss from "./Footer.module.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

const Footer = () => {
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
            <div className={scss.signUp}>
              <input
                type="text"
                name=""
                id=""
                placeholder="example@gmail.com"
              />
              <button>SIGN UP</button>
            </div>
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
