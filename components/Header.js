import styles from "../styles/Header.module.css";
import { useEffect, useState } from "react";

const Header = () => {
  const [toggleValue, setToggleValue] = useState(false);
  const [darkTheme, setDarkTheme] = useState(undefined);

  const handleToggle = () => {
    if (toggleValue) {
      setDarkTheme(false);
      setToggleValue(false);
    } else {
      setDarkTheme(true);
      setToggleValue(true);
    }
  };

  useEffect(() => {
    if (darkTheme !== undefined) {
      if (darkTheme) {
        document.documentElement.setAttribute("data-theme", "dark");
        window.localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        window.localStorage.setItem("theme", "light");
      }
    }
  }, [darkTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );
    setDarkTheme(initialColorValue === "dark");
  }, []);
  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        <h3>Where in the world?</h3>
        <button onClick={handleToggle}>
          <p><i className="fa-solid fa-moon"></i>&nbsp;&nbsp;Dark Mode</p>
        </button>
      </div>
    </header>
  );
};

export default Header;
