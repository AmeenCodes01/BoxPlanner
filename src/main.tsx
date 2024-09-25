import {createRoot} from "react-dom/client";
import App from "./App.tsx";
// import {TaskBoxProvider} from "./context/TaskBoxContext.js";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // <TaskBoxProvider>
  <App />
  // </TaskBoxProvider>
);
