import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitializerScript }}
        ></script>
        <script
          src="https://kit.fontawesome.com/ba4a4976f7.js"
          crossorigin="anonymous"
        ></script>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

const themeInitializerScript = `(function(){
  ${setInitialColorMode.toString()}
  setInitialColorMode();
})()`;

function setInitialColorMode() {
  // check initial color preference
  function getInitialColorMode() {
    const persistedPreferenceMode = window.localStorage.getItem("theme");
    const hasPersistedPreference = typeof persistedPreferenceMode === "string";

    if (hasPersistedPreference) {
      return persistedPreferenceMode;
    }

    // check the current preference
    const preferences = window.matchMedia("(prefers-color-scheme: dark)");
    const hasMediaQueryPreference = typeof preferences.matches == "boolean";

    if (hasMediaQueryPreference) {
      return preferences.matches ? "dark" : "light";
    }
    return "light";
  }

  const currentColorMode = getInitialColorMode();
  const element = document.documentElement;
  element.style.setProperty("--initial-color-mode", currentColorMode);

  // if darkmode apply dark mode
  if (currentColorMode === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}
