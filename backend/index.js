const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const deliveriesRoutes = require('./routes/deliveries');
const path = require('path');

dotenv.config();
const mongoURI = process.env.MONGO_URI;
const app = express();

// ✅ CORS autorise tout le frontend (domaine complet)
app.use(cors({
  origin: 'https://4173-idx-gestion-de-livraison-1744619201469.cluster-qtqwjj3wgzff6uxtk26wj7fzq6.cloudworkstations.dev',
  credentials: true
}));

app.use(express.json());

// API
app.use('/api/deliveries', deliveriesRoutes);

// Frontend Vite
app.use(express.static(path.join(__dirname, 'public', 'dist')));  // Correct pour public/dist
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});


// DB + Serveur
mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connecté à MongoDB Atlas"))
  .catch(err => console.error("❌ Erreur MongoDB:", err));

const PORT = 5000;
;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur le port ${PORT}`);
});
