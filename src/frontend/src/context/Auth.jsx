import { CircularProgress } from "@mui/material";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            var authenticated = window.auth.isAuthenticated;
            if (!authenticated) {
                navigate('/');
                return;
            }
        };
    
        checkAuth();
    }, [navigate]);

    

    return (
        <AuthContext.Provider value={{  }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;