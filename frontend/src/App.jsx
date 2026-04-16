import '@mantine/core/styles.css';

import UserContext from "./context/userContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/index";
import { Notifications } from '@mantine/notifications';
import { DirectionProvider, MantineProvider, createTheme } from '@mantine/core';

import "./App.css";
import "./i18n";
import { useEffect } from 'react';
import i18n from './i18n';

export const themeColor = [
  "#eaf2ff",
  "#d5e2fb",
  "#aac2f0",
  "#7da0e6",
  "#5783de",
  "#3f71d9",
  "#3068d8",
  "#2157c0",
  "#184eac",
  "#04439a",
];

export const themeColorLight = [
  "#f8f9fa", // 0 - background
]

export const themeColorDark = [
  "#C9D1D9", // 0 - text
  "#B1BAC4", // 1
  "#8B949E", // 2 - secondary text
  "#6E7681", // 3
  "#2a2e33", // 4 - borders
  "#30363D", // 5
  "#12161c", // 6
  "#0d1014", // 7 - surfaces
  "#0D1117", // 8 - cards
  "#010409"  // 9 - page background
];

export const theme = createTheme({
  primaryColor: "themeColor",
  // 1. Tell Mantine to use the CSS variable we defined
  fontFamily: 'var(--app-font)', 
  colors: {
    themeColor,
    dark: themeColorDark,
  },

});

export default function App() {

  useEffect(() => {
    const currentLang = i18n.language;
    const currentDir = currentLang === "ar" ? "rtl" : "ltr";
    
    // Set direction
    document.documentElement.dir = currentDir;
    // Set language (important for accessibility and font rendering)
    document.documentElement.lang = currentLang;
  }, [i18n.language]);


  return (
    <DirectionProvider>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <UserContext>
          <Notifications />
          <RouterProvider router={router} />
        </UserContext>
      </MantineProvider>
    </DirectionProvider>
  );
}