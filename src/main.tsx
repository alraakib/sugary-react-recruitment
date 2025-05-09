import App from "@/App.tsx";
import { store } from "@/store/index.ts";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Toaster position="bottom-right" />
    <App />
  </Provider>
);
