const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const deliveriesRoutes = require('./routes/deliveries');
const path = require('path');

dotenv.config();
const mongoURI = process.env.MONGO_URI;
const app = express();
const cors = require('cors');

// Liste des origines autorisées
const allowedOrigins = [
  'https://guesmi-rania.github.io',  // GitHub Pages
  'https://gestion-de-livraison-frontend.onrender.com'  // Render frontend
];

// Application de CORS sur les routes
app.use(cors({
  origin: allowedOrigins, // Autorise les origines spécifiées
  credentials: true  // Permet les cookies (si nécessaire)
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

  
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur le port ${PORT}`);
});
