import React, { ChangeEvent, JSX, useState } from "react";
import ThrobberOverlay from "../../ui/throbber-overlay/throbber-overlay";

export type LoginFormState = "initial" | "registration" | "login";

export interface LoginFormData {
    username: string;
    password: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
}

interface Props {
    onSubmit?: (loginFormData: LoginFormData) => void;
    isLoading: boolean;
    loginFormState: LoginFormState;
    onLoginChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginForm({
    loginFormState,
    isLoading,
    onSubmit,
    onLoginChange,
}: Props) {
    const [loginFormData, setLoginFormData] = useState<LoginFormData>({
        username: "",
        password: "",
    });

    const { username, password, firstName, lastName, confirmPassword } =
        loginFormData;

    const loginFormElementsByState: Record<LoginFormState, JSX.Element | null> =
        {
            initial: (
                <>
                    {isLoading ? (
                        <div className="blur-2 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    disabled
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                    ) : null}
                </>
            ),
            registration: (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="credentials"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            First name
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            value={firstName}
                            onChange={firstNameChangeHandler}
                            required
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="credentials"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Last name
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            value={lastName}
                            onChange={lastNameChangeHandler}
                            required
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            type="password"
                            value={password}
                            onChange={passwordChangeHandler}
                            autoComplete="current-password"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="confirm"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Confirm Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={confirmationPasswordChangeHandler}
                            autoComplete="current-password"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>
            ),
            login: (
                <div className="animate-appear flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={passwordChangeHandler}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>
            ),
        };

    function onSubmitHandler() {
        switch (loginFormState) {
            case "login":
                if (!onSubmit || !username || !password) return;
                break;
            case "registration":
                if (
                    !onSubmit ||
                    !username ||
                    !firstName ||
                    !lastName ||
                    !password ||
                    !confirmPassword
                )
                    return;
                break;
        }

        onSubmit && onSubmit(loginFormData);
    }

    function onLoginChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setLoginFormData((curr) => ({
            ...curr,
            username: event.target.value,
        }));
        onLoginChange(event);
    }

    function passwordChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const password = event.target.value;
        setLoginFormData((curr) => ({
            ...curr,
            password,
        }));
    }

    function confirmationPasswordChangeHandler(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const confirmPassword = event.target.value;
        setLoginFormData((curr) => ({
            ...curr,
            confirmPassword,
        }));
    }

    function firstNameChangeHandler(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const firstName = event.target.value;
        setLoginFormData((curr) => ({
            ...curr,
            firstName,
        }));
    }

    function lastNameChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const lastName = event.target.value;
        setLoginFormData((curr) => ({
            ...curr,
            lastName,
        }));
    }

    return (
        <div
            className="space-y-6"
            onKeyDown={(e) => e.key === "Enter" && onSubmitHandler()}
        >
            <div className="relative flex flex-col gap-4">
                <div>
                    <label
                        htmlFor="identificator"
                        className="block text-sm/6 font-medium text-gray-900"
                    >
                        Username
                    </label>
                    <div className="mt-2">
                        <input
                            type="username"
                            value={username}
                            onChange={onLoginChangeHandler}
                            autoComplete="username"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>
                <ThrobberOverlay isLoading={isLoading}>
                    <div
                        className={`${isLoading ? "min-h-10 animate-blur-in blur-sm" : "animate-blur-out blur-0"} `}
                    >
                        {loginFormElementsByState[loginFormState]}
                    </div>
                </ThrobberOverlay>
            </div>
            <div className="flex flex-row justify-between gap-3">
                <button
                    disabled={loginFormState === "initial"}
                    onClick={onSubmitHandler}
                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:cursor-not-allowed disabled:bg-green-300"
                >
                    {["login", "initial"].includes(loginFormState)
                        ? "Sign in"
                        : "Create New Account"}
                </button>
            </div>
        </div>
    );
}
