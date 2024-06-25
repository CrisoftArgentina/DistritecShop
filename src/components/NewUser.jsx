// eslint-disable-next-line react/prop-types
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const NewUser = ({ email, onConfirmarPedido }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const clienteData = {
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            email: formData.get('email'),
            contrasena: formData.get('contrasena'),
            direccion: formData.get('direccion'),
            localidad: formData.get('localidad'),
        };

        try {
            const clienteRef = await addDoc(collection(db, "clientes"), clienteData);
            const clienteId = clienteRef.id;
            localStorage.setItem('clienteID', clienteId);
            onConfirmarPedido();
        } catch (error) {
            console.error("Error al agregar el documento: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-6">
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            name="nombre"
                            placeholder="Nombre"
                            required
                        />
                        <label htmlFor="nombre">Nombre</label>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="apellido"
                            name="apellido"
                            placeholder="Apellido"
                            required
                        />
                        <label htmlFor="apellido">Apellido</label>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="contrasena"
                            name="contrasena"
                            placeholder="Contraseña"
                            required
                        />
                        <label htmlFor="contrasena">Contraseña</label>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-floating">
                        <input
                            type="email"
                            value={email}
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="direccion"
                            name="direccion"
                            placeholder="Direccion"
                            required
                        />
                        <label htmlFor="direccion">Direccion</label>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="localidad"
                            name="localidad"
                            placeholder="Localidad"
                            required
                        />
                        <label htmlFor="localidad">Localidad</label>
                    </div>
                </div>
                <div className="d-flex gap-3 pt-3 justify-content-end">
                    <button type="submit" className="btn-addCart p-2">Confirmar Pedido</button>
                </div>
            </div>
        </form>
    )
}

export default NewUser;
