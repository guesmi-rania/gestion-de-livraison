const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery'); // Ton modèle Mongoose

// 🔄 Récupérer toutes les livraisons
router.get('/', async (req, res) => {
  try {
    console.log("📥 Requête GET reçue");
    const deliveries = await Delivery.find(); // ← c’est ici que ça peut planter
    res.json(deliveries);
  } catch (err) {
    console.error("❌ Erreur GET :", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// ➕ Ajouter une nouvelle livraison
router.post('/', async (req, res) => {
  console.log("✅ Données reçues pour création :", req.body); // Debug console

  const { clientName, address, deliveryDate, status } = req.body;

  // Vérification des champs obligatoires
  if (!clientName || !address || !deliveryDate) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const newDelivery = new Delivery({
      clientName,
      address,
      deliveryDate,
      status: status || 'En cours'
    });

    const savedDelivery = await newDelivery.save();
    res.status(201).json(savedDelivery);
  } catch (error) {
    console.error("❌ Erreur lors de l'enregistrement :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// ❌ Supprimer une livraison
router.delete('/:id', async (req, res) => {
  try {
    await Delivery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Livraison supprimée." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
