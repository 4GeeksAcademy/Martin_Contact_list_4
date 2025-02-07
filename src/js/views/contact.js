import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import ContactCard from "../component/contactCard";
import { Link } from "react-router-dom";

const Contact = () => {
    const { store, actions } = useContext(Context);
    const [updated, setUpdated] = useState(false); 

    
    useEffect(() => {
        actions.loadSomeData();
    }, []); 

    
    const handleDelete = (id) => {
        actions.deleteContact(id).then(() => {
            setUpdated(!updated); 
        });
    };

    return (
        <div className="container w-auto mx-3" style={{maxWidth: "100%"}}>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "white" }}>
                <div className="container-fluid pe-0">
                    <div className="collapse navbar-collapse d-flex justify-content-end pe-0">
                        <Link to="/add-contact">
                            <button className="btn btn-success">Añadir Contacto</button>
                        </Link>
                    </div>
                </div>
            </nav>

            {store.contacts.length > 0 && (
                <ul className="list-group">
                    {store.contacts.map(contact => (
                        <li key={contact.id} className="list-group-item">
                            <ContactCard 
                                contact={contact} 
                                onDelete={handleDelete}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Contact;






