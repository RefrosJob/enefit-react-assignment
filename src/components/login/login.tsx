import { debounce, omit } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LoginForm, {
    LoginFormData,
    LoginFormState,
} from "./login-form/login-form";
import { useStore } from "../../store/authStore.ts";
import {
    getIsUserRegistered,
    signIn,
    signUp,
} from "../../services/enefitApi.ts";
import { useDispatch } from "react-redux";
import { setAuthorizationPackage } from "../../store/reducers/auth.ts";

export default function Login() {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const { authKey } = useStore((state) => state.authorizationPackage.value);

    const [isVerificationLoading, setIsVerificationLoading] = useState(false);
    const [loginFormState, setLoginFormState] =
        useState<LoginFormState>("initial");

    const confirmUsernameDebounced = debounce(confirmUsername, 400);

    const formActionByFormState: Partial<
        Record<LoginFormState, (LoginFormData: LoginFormData) => void>
    > = {
        login: login,
        registration: register,
    };

    useEffect(() => {
        if (authKey) {
            navigateTo("/");
        }
    }, [navigateTo, authKey]);

    async function onLoginChange(event: ChangeEvent<HTMLInputElement>) {
        const username = event.target.value;
        setIsVerificationLoading(true);
        if (!username.length) {
            setLoginFormState("initial");
            return;
        }
        await confirmUsernameDebounced(username);
    }

    async function confirmUsername(username: string) {
        console.debug("login user", username);
        if (username.length < 2) {
            setLoginFormState("initial");
            return;
        }
        try {
            const { data: isUserRegistered } =
                await getIsUserRegistered(username);
            console.log(isUserRegistered);
            if (!!isUserRegistered) {
                setLoginFormState("login");
            } else {
                console.debug("user registered", isUserRegistered);
                setLoginFormState("registration");
            }
        } catch (error) {
            console.error("LoginCard component:\n", "confirmEmail\n" + error);
            new Notification("Verification error, please try again");
            setLoginFormState("initial");
        }
        setIsVerificationLoading(false);
        return;
    }

    async function login(loginFormData: LoginFormData) {
        const { username } = loginFormData;
        try {
            console.log("login form", loginFormData);
            const { data: userId } = await signIn(
                omit(loginFormData, [
                    "confirmPassword",
                    "firstName",
                    "lastName",
                ]),
            );
            if (!!userId) {
                dispatch(
                    setAuthorizationPackage({ username, authKey: userId }),
                );
                navigateTo("/");
            }
        } catch (error) {
            console.error("LoginCard component:\n", "login\n" + error);
            return;
        }
    }

    async function register(loginFormData: LoginFormData) {
        console.log("reg form", loginFormData);
        const { username } = loginFormData;
        try {
            const { data: userId } = await signUp(loginFormData);
            if (userId) {
                dispatch(
                    setAuthorizationPackage({ username, authKey: userId }),
                );
                navigateTo("/");
            }
        } catch (error) {
            console.error("LoginCard component:\n", "login\n" + error);
            return;
        }
    }

    return (
        <div className="flex h-full w-full flex-row justify-center align-middle">
            <div className="flex h-full w-auto flex-col justify-center">
                <div className="rounded-xl bg-slate-300 shadow-md transition-all duration-75 ease-in-out">
                    <div className="flex h-max flex-col justify-center p-6 transition-all duration-75 ease-in-out lg:px-8">
                        <div className="h-0 sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="relative bottom-16 border-spacing-4 rounded-xl border-2 bg-slate-300 p-1 text-center text-2xl font-bold uppercase tracking-tight text-gray-700 shadow-md">
                                Sign-in or create a new account
                            </h2>
                        </div>
                        <div className="mt-5 sm:w-full sm:max-w-sm">
                            <LoginForm
                                isLoading={isVerificationLoading}
                                onSubmit={formActionByFormState[loginFormState]}
                                loginFormState={loginFormState}
                                onLoginChange={onLoginChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
