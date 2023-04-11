import { ThemeContext, themes } from "context/ThemeContext";
import React, { useEffect, useMemo, useState } from "react";
import { useContext } from "react";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = async () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  const getTheme = async () => {
    return theme;
  };

  const themeAPI = useMemo(() => {
    return {
      theme,
      toggleTheme,
      getTheme,
    };
  }, [theme, toggleTheme, getTheme]);

  return (
    <ThemeContext.Provider value={themeAPI}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export default ThemeProvider;
