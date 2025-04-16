import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ✅ URL exacte du backend
const API_URL = '/api/deliveries';

const App = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [newDelivery, setNewDelivery] = useState({
    clientName: '',
    address: '',
    deliveryDate: '',
    status: 'En cours'
  });

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setDeliveries(response.data);
      })
      .catch(error => console.error("Erreur GET :", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDelivery({ ...newDelivery, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newDelivery.clientName || !newDelivery.address || !newDelivery.deliveryDate) {
      alert('Tous les champs sont obligatoires');
      return;
    }

    axios.post(API_URL, newDelivery)
      .then(response => {
        setDeliveries([...deliveries, response.data]);
        setNewDelivery({ clientName: '', address: '', deliveryDate: '', status: 'En cours' });
      })
      .catch(error => console.error("Erreur POST :", error));
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setDeliveries(deliveries.filter(delivery => delivery._id !== id));
      })
      .catch(error => console.error("Erreur DELETE :", error));
  };

  return (
    <div>
      <h1>Gestion des Livraisons</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="clientName" placeholder="Nom du client" value={newDelivery.clientName} onChange={handleChange} />
        <input type="text" name="address" placeholder="Adresse de livraison" value={newDelivery.address} onChange={handleChange} />
        <input type="date" name="deliveryDate" value={newDelivery.deliveryDate} onChange={handleChange} />
        <select name="status" value={newDelivery.status} onChange={handleChange}>
          <option value="En cours">En cours</option>
          <option value="Livré">Livré</option>
          <option value="Annulé">Annulé</option>
        </select>
        <button type="submit">Ajouter Livraison</button>
      </form>

      <h2>Livraisons en cours</h2>
      <ul>
        {deliveries.map(delivery => (
          <li key={delivery._id}>
            {delivery.clientName} - {delivery.address} - {delivery.deliveryDate} - {delivery.status}
            <button onClick={() => handleDelete(delivery._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
