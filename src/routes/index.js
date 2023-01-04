import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import useAuth from "../hooks/useAuth";

const Private = ({ Item }) => {
    const { signed } = useAuth();
    return signed > 0 ? <Item /> : <Login />;
}

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/home" element={<Private Item={Home} /> } />
                    <Route path="/" element={<Login />} />
                    <Route exact path="/signup" element={<SignUp />} />
                    <Route path="*" element={<SignUp />} /> 
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}

export default RoutesApp;