/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Button, Popover, Overlay, Form } from 'react-bootstrap';
import user from '../assets/user.svg';
import cart from '../assets/cart2.svg';
import logout from '../assets/logout.svg';
import { CorreoContext } from '../contexts/CorreoContext';
import { Link } from "react-router-dom";
import useLogin from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const LoginPopover = () => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    const { addCorreo, correo } = useContext(CorreoContext);
    const { verificarUsuario } = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        const cuenta = localStorage.getItem('correo') || "";
        addCorreo(cuenta);
    }, [addCorreo]);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    const handleLogin = async (event) => {

        event.preventDefault();
        const form = event.target;
        const email = form.elements.email.value;
        const password = form.elements.password.value;
        await verificarUsuario(email, password);
        setShow(false);
    };

    const handleLogOut = () => {
        addCorreo("");
        localStorage.removeItem('correo');
        localStorage.removeItem('clienteID');
        navigate('/');
    };

   
    return (
        <>
            <div>
                {correo !== "" ? (
                    <div ref={ref} className='circle-user' onClick={handleClick}>
                        <p>{correo.charAt(0).toUpperCase()}</p>
                        <Overlay
                            show={show}
                            target={target}
                            placement="bottom"
                            container={ref}
                            containerPadding={20}
                        >
                            <Popover id="popover-contained" className='zindex' style={{ minWidth: '100px' }}>
                                <Popover.Header as="h3" className='head-popover text-one'>{correo}</Popover.Header>
                                <Popover.Body>
                                    <ul>
                                        <Link className='link-decoration' to={"/MisPedidos"}>
                                            <li>
                                                <div className='d-flex gap-2 popover-item'>
                                                    <img src={cart} alt="user" width={25} />
                                                    <p> Mis Pedidos</p>
                                                </div>
                                            </li>
                                        </Link>
                                        <li className='mt-2'>
                                            <div className='d-flex gap-2 popover-item'>
                                                <img src={user} alt="user" width={20} />
                                                <p> Mi Cuenta</p>
                                            </div>
                                        </li>
                                        <li className='mt-2'>
                                            <div className='d-flex gap-2 popover-item' onClick={handleLogOut}>
                                                <img src={logout} alt="user" width={20} />
                                                <p> Cerrar Sesíon</p>
                                            </div>
                                        </li>
                                    </ul>
                                </Popover.Body>
                            </Popover>
                        </Overlay>
                    </div>
                ) : (
                    <div ref={ref}>
                        <Button className='btn-user' onClick={handleClick}>
                            <div className='d-flex justify-content-center align-items-center gap-2' >
                                <img src={user} alt="user" width={25} />
                                <p className='lbl-sesion'>Iniciar Sesión</p>
                            </div>

                        </Button>
                        <Overlay
                            show={show}
                            target={target}
                            placement="bottom"
                            container={ref}
                            containerPadding={20}
                        >
                            <Popover id="popover-contained" className='zindex' style={{ minWidth: '350px' }}>
                                <Popover.Header as="h3" className='head-popover'>Inicio de Sesión</Popover.Header>
                                <Popover.Body>
                                    <Form onSubmit={handleLogin}>
                                        <Form.Group controlId="formEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" name="email" placeholder="Introduce tu email" required />
                                        </Form.Group>
                                        <Form.Group controlId="formPassword">
                                            <Form.Label>Contraseña</Form.Label>
                                            <Form.Control type="password" name="password" placeholder="Contraseña" required />
                                        </Form.Group>
                                        <div className='d-flex justify-content-end'>
                                            <Button type="submit" className="mt-3 btn-iniciar">
                                                Iniciar Sesión
                                            </Button>
                                        </div>
                                    </Form>
                                </Popover.Body>
                            </Popover>
                        </Overlay>
                    </div>
                )}
            </div>
        </>
    );
};

export default LoginPopover;
