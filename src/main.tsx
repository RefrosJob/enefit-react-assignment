import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./components/router/router";
import "./twindex.css";
import { Provider } from "react-redux";
import store from "./store/authStore.ts";

import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <Router />
        </Provider>
    </StrictMode>,
);
