import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AdminContextProvider from "./context/AdminContext.jsx";
import TeacherContextProvider from "./context/TecherContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <TeacherContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </TeacherContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
