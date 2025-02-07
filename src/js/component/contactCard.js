import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContactCard = ({ contact, onDelete }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="d-flex justify-content-between w-100 p-3">
                <div className="d-flex align-items-center">
                    <img 
                        src="https://picsum.photos/seed/picsum/120/120" 
                        alt="contact" 
                        className="rounded-circle me-3"
                        style={{ width: "120px", height: "120px", marginRight:"60%" }}
                    />
                    <div className="data aling-items-end ms-5">
                        <h5 className="mb-1 fw-bold">{contact.name}</h5>
                        <p className="mb-1 d-flex"><i className="bi bi-geo-alt-fill me-3"></i>{contact.address}</p>
                        <p className="mb-1 d-flex"><i className="bi bi-telephone-fill me-3"></i>{contact.phone}</p>
                        <p className="mb-1 d-flex"><i className="bi bi-envelope-fill me-3"></i>{contact.email}</p>
                    </div>
                </div>
                <div className="d-flex align-items-start">
                    <Link to={`/edit-contact/${contact.id}`} className="me-5" style={{ color: "black", fontSize: "24px" }}>
                        <i className="bi bi-pencil-fill"></i> 
                    </Link>
                    <i className="bi bi-trash-fill me-3" onClick={() => setShowModal(true)} style={{ cursor: "pointer", fontSize: "24px" }}></i> 
                </div>
            </div>

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Eliminar Contacto</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>¿Seguro que quieres borrar el contacto?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => { onDelete(contact.id); setShowModal(false); }}>
                                    Eliminar Contacto
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactCard;




