import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import { useSelector } from "react-redux";

export default configureStore({
    reducer: {
        authorizationPackage: authReducer,
    },
});

export interface AuthStore {
    authorizationPackage: {
        value: AuthStoreState;
    };
}

export interface AuthStoreState {
    username?: string;
    authKey?: string;
}

export const useStore = useSelector.withTypes<AuthStore>();
