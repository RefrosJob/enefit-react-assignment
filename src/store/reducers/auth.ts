import { createSlice } from "@reduxjs/toolkit";
import { AuthStoreState } from "../authStore.ts";

const LocalAuthPackage = "LOCAL_AUTH_PACKAGE";

const authSlice = createSlice({
    name: "authorizationPackage",
    initialState: {
        value: initStateFromLocalStorage(),
    },
    reducers: {
        setAuthorizationPackage: (state, action) => {
            state.value = action.payload;
            localStorage.setItem(
                LocalAuthPackage,
                JSON.stringify(action.payload),
            );
        },

        clearAuthorizationPackage: (state) => {
            state.value = {};
            localStorage.removeItem(LocalAuthPackage);
        },
    },
});

export function initStateFromLocalStorage() {
    const localAuthPackage = localStorage.getItem(LocalAuthPackage);
    if (typeof localAuthPackage === "string") {
        const parsedState: AuthStoreState = JSON.parse(localAuthPackage);
        if (parsedState?.authKey) {
            return parsedState;
        }
    }
    return {};
}

export const { setAuthorizationPackage, clearAuthorizationPackage } =
    authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
