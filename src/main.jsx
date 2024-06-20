import {} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import ThemeContext from "./context/ThemeContext.jsx";
import AuthContext from "./context/AuthContext.jsx";
import ProductContext from "./context/ProductContext.jsx";
import CardContext from "./context/CardContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeContext>
      <AuthContext>
        <ProductContext>
          <CardContext>
            <App />
          </CardContext>
        </ProductContext>
      </AuthContext>
    </ThemeContext>
  </BrowserRouter>
);
