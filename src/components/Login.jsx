// src/components/Login.js
import React from 'react';
import { useState } from 'react';
import NewUser from './NewUser';
import SavePedido from './SavePedido';
import useLogin from '../hooks/useLogin';

const Login = () => {
    const {
        email,
        password,
        passwordVisible,
        nuevoUsuario,
        pedidoAceptado,
        setEmail,
        setPassword,
        verificarUsuario,
        confirmarPedido,
    } = useLogin();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleContinuar = () => {
        verificarUsuario(email, password);
    };

    const handleConfirmarPedido = () => {
        confirmarPedido(email);
    };

    return (
        <div className='container'>
            {pedidoAceptado ? (
                <SavePedido />
            ) : (
                <>
                    <h3>Iniciar Sesión</h3>
                    {!nuevoUsuario && (
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                    )}
                    {passwordVisible && (
                        <div className="form-floating">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                    )}
                    {nuevoUsuario && <NewUser email={email} onConfirmarPedido={handleConfirmarPedido} />}
                    <div className='d-flex justify-content-end mt-2'>
                        {!nuevoUsuario && !pedidoAceptado && (
                            <button type="submit" className="btn-addCart p-2" onClick={handleContinuar}>Continuar</button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Login;
