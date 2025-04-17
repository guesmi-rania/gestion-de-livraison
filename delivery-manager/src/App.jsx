import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ✅ URL exacte du backend avec /api/deliveries
const API_URL = "https://gestion-de-livraison.onrender.com/api/deliveries";

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
      .then(response => setDeliveries(response.data))
      .catch(error => console.error("❌ Erreur lors du GET :", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDelivery(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { clientName, address, deliveryDate } = newDelivery;

    if (!clientName || !address || !deliveryDate) {
      alert('Tous les champs sont obligatoires');
      return;
    }

    axios.post(API_URL, newDelivery, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        setDeliveries([...deliveries, response.data]);
        setNewDelivery({ clientName: '', address: '', deliveryDate: '', status: 'En cours' });
      })
      .catch(error => console.error("❌ Erreur lors du POST :", error));
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}${id}`)
      .then(() => {
        setDeliveries(deliveries.filter(delivery => delivery._id !== id));
      })
      .catch(error => console.error("❌ Erreur lors du DELETE :", error));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>📦 Gestion des Livraisons</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" name="clientName" placeholder="Nom du client" value={newDelivery.clientName} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Adresse de livraison" value={newDelivery.address} onChange={handleChange} required />
        <input type="date" name="deliveryDate" value={newDelivery.deliveryDate} onChange={handleChange} required />
        <select name="status" value={newDelivery.status} onChange={handleChange}>
          <option value="En cours">En cours</option>
          <option value="Livré">Livré</option>
          <option value="Annulé">Annulé</option>
        </select>
        <button type="submit">Ajouter Livraison</button>
      </form>

      <h2>📋 Livraisons</h2>
      <ul>
        {deliveries.map(delivery => (
          <li key={delivery._id}>
            <strong>{delivery.clientName}</strong> — {delivery.address} — {delivery.deliveryDate} — <em>{delivery.status}</em>
            <button onClick={() => handleDelete(delivery._id)} style={{ marginLeft: '10px' }}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
