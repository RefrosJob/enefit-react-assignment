import fetch from "axios";
import { LoginFormData } from "../components/login/login-form/login-form.tsx";
import { MeteringPoint } from "../types/consumption.ts";

const url = "localhost:8080";
const getUrl = (path: string) => `http://${url}${path}`;

export async function getIsUserRegistered(username: string) {
    console.debug(username);
    return await fetch.get<boolean>(
        getUrl(`/is-registered?username=${username}`),
    );
}

export async function signIn(loginFormData?: LoginFormData) {
    console.debug("logging in", loginFormData);
    return await fetch.post<string>(getUrl("/login"), loginFormData);
}

export async function signUp(loginFormData?: LoginFormData) {
    return await fetch.post<string>(getUrl("/register"), loginFormData);
}

export async function getMeteringPointsWithConsumptionData(
    username: string,
    authKey: string,
) {
    return await fetch.get<MeteringPoint[]>(
        getUrl(`/${username}/consumption?userId=${authKey}`),
    );
}
