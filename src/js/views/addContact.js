import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate, Link } from "react-router-dom";

const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    const [contact, setContact] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    useEffect(() => {
        if (id) {
            const existingContact = store.contacts.find(contact => contact.id === parseInt(id));
            if (existingContact) {
                setContact({
                    name: existingContact.name,
                    phone: existingContact.phone,
                    email: existingContact.email,
                    address: existingContact.address
                });
            }
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (!contact.name.trim() || !contact.email.trim() || !contact.phone.trim()) {
            alert("Por favor, completa los campos obligatorios.");
            return;
        }

        if (id) {
            actions.updateContact(parseInt(id), contact).then(() => {
                navigate("/");
            });
        } else {
            actions.createContact(contact).then(() => {
                navigate("/");
            });
        }
    };

    return (
        <div className="container">
            <h1 className="mb-4">{id ? "Editar Contacto" : "Crear Contacto"}</h1>
            <form onSubmit={handleSave}>
                <div className="mb-3">
                    <label htmlFor="InputName" className="form-label">Nombre *</label>
                    <input
                        type="text"
                        className="form-control"
                        id="InputName"
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                        placeholder="Nombre"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Correo electrónico *</label>
                    <input
                        type="email"
                        className="form-control"
                        id="InputEmail"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPhone" className="form-label">Número *</label>
                    <input
                        type="text"
                        className="form-control"
                        id="InputPhone"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                        placeholder="Número"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputAddress" className="form-label">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        id="InputAddress"
                        name="address"
                        value={contact.address}
                        onChange={handleChange}
                        placeholder="Dirección"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    {id ? "Guardar cambios" : "Crear Contacto"}
                </button>
            </form>

            <div className="mt-3">
                <Link to="/" className="text-primary text-decoration-none hover:text-decoration-underline">
                    Volver a contactos
                </Link>
            </div>
        </div>
    );
};

export default AddContact;




