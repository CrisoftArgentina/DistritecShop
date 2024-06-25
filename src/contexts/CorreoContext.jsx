
// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext } from 'react';

const CorreoContext = createContext();

// eslint-disable-next-line react/prop-types
const CorreoContextProvider = ({ children }) => {
    const [correo, setCorreo] = useState("");

    const addCorreo = (email) => {
        setCorreo(email);
    };


    return (
        <CorreoContext.Provider value={{ correo, addCorreo }}>
            {children}
        </CorreoContext.Provider>
    );
};

export { CorreoContext, CorreoContextProvider };