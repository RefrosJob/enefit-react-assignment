import { BrowserRouter, Route, Routes } from "react-router";
import Login from "../login/login";
import MainLayout from "../main/main-layout";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
