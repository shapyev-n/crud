import {} from "react";
import scss from "./pages.module.scss";
import Message from "../components/Message";

const AboutPage = () => {
  return (
    <div className={scss.about}>
      <div className="container">
        <h1>About</h1>
        <div className={scss.content}>
          <p>Здесь можно разместить рекламы</p>
        </div>
      </div>
      <Message />
    </div>
  );
};

export default AboutPage;
