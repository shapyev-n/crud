import {} from "react";
import MainRoutes from "../../routes/MainRoutes";
import scss from "./Layout.module.scss";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const Layout = () => {
  return (
    <div className={scss.layout}>
      <Header />
      <main >
        <MainRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
