import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MyStoreProvider } from "./context/MyStore.jsx";

createRoot(document.getElementById("root")).render(
  <MyStoreProvider>
    <App/>
  </MyStoreProvider>
);
