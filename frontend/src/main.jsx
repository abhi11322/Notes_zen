import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { NotesProvider } from "./context/NotesContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <NotesProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </NotesProvider>
  </AuthProvider>
);