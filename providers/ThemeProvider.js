import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    sessionStorage.setItem("mode", theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (sessionStorage.getItem("mode"))
      setTheme(sessionStorage.getItem("mode"));
  }, []);

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;

export function useTheme() {
  return useContext(ThemeContext);
}
