import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";

import LogIn from "./Pages/LogIn";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import EditProfile from "./Pages/EditProfile";

const PrivateRoute = ({ children }) => {

    const Token = localStorage.getItem("@Token");

    if (Token) {
        return children;
    } else {
        return <Navigate to="/login" />
    }

}

const AppRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route path="/login" exact element={<LogIn />} />
                <Route path="/register" exact element={<Register />} />
                <Route path="/" element={<PrivateRoute> <Home /> </PrivateRoute>} />
                <Route path="/edit" element={<PrivateRoute> <EditProfile /> </PrivateRoute>}/>
            </Routes>
        </Router>
    )
};

export default AppRoutes;