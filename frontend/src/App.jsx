import '@mantine/core/styles.css';

import UserContext from "./context/userContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/index";
import { Notifications } from '@mantine/notifications';
import { MantineProvider, createTheme } from '@mantine/core';

import "./App.css";
import "./i18n";

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
  colors: {
    themeColor,
    dark: themeColorDark,
  }
});

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <UserContext>
        <Notifications />
        <RouterProvider router={router} />
      </UserContext>
    </MantineProvider>
  );
}