const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const turmaRoutes = require('./src/routes/turmaRoutes');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const doacaoRoutes = require('./src/routes/doacaoRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');


app.use('/api/turmas', turmaRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/doacoes', doacaoRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🚀 Servidor rodando!');
    console.log(`📍 URL: http://localhost:${PORT} `);
    console.log(💾 Banco: PostgreSQL (${process.env.DB_DATABASE}));
    console.log('='.repeat(50));
});