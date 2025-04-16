// backend/models/Delivery.js
const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  address: { type: String, required: true },
  deliveryDate: { type: String, required: true }, // ou Date selon ce que tu veux
  status: { type: String, default: 'En cours' }
});

module.exports = mongoose.model('Delivery', deliverySchema);
