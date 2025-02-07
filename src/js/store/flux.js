const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            demo: [],
            contacts: [],
        },
        actions: {
            loadSomeData: () => {
                fetch('https://playground.4geeks.com/contact/agendas/martin/contacts')
                .then(response => {
                    if (response.status == 404) {
                        return null;    
                    }
                    return response.json();
                })
                .then(data => {
                    if (data) {
                        console.log("Data fetched: ", data); 
                        setStore({ contacts: Array.isArray(data.contacts) ? data.contacts : [] }); 
                    }
                })
                .catch(error => console.error("Error fetching contacts:", error));
            },
            createContact: (newContact) => {
                return fetch('https://playground.4geeks.com/contact/agendas/martin/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newContact)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error creating new contact');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Contact created successfully:', data);
                    const actions = getActions();
                    actions.loadSomeData(); 
                })
                .catch(error => console.error("Error creating user:", error));
            },
            updateContact: (id, updatedContact) => {
                return fetch(`https://playground.4geeks.com/contact/agendas/martin/contacts/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedContact)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error updating contact');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Contact updated successfully:', data);
                    const actions = getActions();
                    actions.loadSomeData(); 
                })
                .catch(error => console.error("Error updating contact:", error));
            },
            deleteContact: (id) => {
                fetch(`https://playground.4geeks.com/contact/agendas/martin/contacts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error deleting contact');
                    }
                    return response.text().then(text => {
                        return text ? JSON.parse(text) : {};
                    });
                })
                .then(data => {
                    const store = getStore();
                    const filteredContacts = store.contacts.filter(contact => contact.id !== id);
                    setStore({ contacts: filteredContacts });
                    console.log('Contact deleted successfully');
                    const actions = getActions();
                    actions.loadSomeData(); 
                })
                .catch(error => console.error("Error deleting contact:", error));
            }
        }
    };
};

export default getState;
		