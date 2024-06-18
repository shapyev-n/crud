import {} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import ThemeContext from "./context/ThemeContext.jsx";
import AuthContext from "./context/AuthContext.jsx";
import ProductContext from "./context/ProductContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeContext>
      <AuthContext>
        <ProductContext>
          <App />
        </ProductContext>
      </AuthContext>
    </ThemeContext>
  </BrowserRouter>
);
