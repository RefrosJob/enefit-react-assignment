import Login from "../components/login/login.tsx";
import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";

// WHY ARE YOU COMPLAINING ABOUT LOCALSTORAGE?? YOU ARE SET TO JSDOM!! STUPID MACHINE

describe("Login components", () => {
    test("Should render input", () => {
        render(<Login />);
        const element = screen.getByRole("heading");
        expect(element).toBeInTheDocument();
    });
});
