import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext();
export const useTheme = () => useContext(themeContext);

const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("mode")) || "light"
  );

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function switchTheme() {
    setTheme((cur) => {
      const newTheme = cur === "light" ? "dark" : "light";
      localStorage.setItem("mode", JSON.stringify(newTheme));
      return newTheme;
    });
  }
  const values = {
    theme,
    switchTheme,
  };
  return (
    <themeContext.Provider value={values}>{children}</themeContext.Provider>
  );
};

export default ThemeContext;
