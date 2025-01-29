import { AuthStore } from "../authStore.ts";
import { initStateFromLocalStorage } from "../reducers/auth.ts";

export function getAuthPackageWithLocalStorage(state: AuthStore) {
    let authPackage = state.authorizationPackage.value;
    if (!authPackage.authKey) {
        authPackage = initStateFromLocalStorage();
    }
    return authPackage;
}
