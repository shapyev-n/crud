import {} from "react";
import scss from "./pages.module.scss";
import Message from "../components/Message";
import { useAuth } from "../context/AuthContext";

const AboutPage = () => {
  const { user } = useAuth();
  return (
    <div className={scss.about}>
      <div className="container">
        <h1>About</h1>
        <div className={scss.content}>
          <p>Здесь можно разместить рекламы</p>
        </div>
      </div>
      {user ? <Message /> : ""}
    </div>
  );
};

export default AboutPage;
