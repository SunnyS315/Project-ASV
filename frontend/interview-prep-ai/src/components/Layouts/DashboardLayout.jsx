import React from 'react'
import { useContext } from "react";
import { UserContext } from "../../context/AuthContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
        const { user } = useContext(UserContext);
    return (
        <div>
            <Navbar />
            {user && <div>{children}</div>}
        </div>
    );
};

export default DashboardLayout