const express = require('express');
const path = require('path');
const mysql = require('mysql2'); 
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;


const pool = mysql.createPool({
  host: 'bqoidrmxthx4m9dwrubr-mysql.services.clever-cloud.com', 
  user: 'uv56cxcocjwosjop', 
  password: 'bqABEWdDYIwcXVr27B6q', 
  database: 'bqoidrmxthx4m9dwrubr', 
  waitForConnections: true, 
  connectionLimit: 10,
  queueLimit: 0 
});


app.use(cors()); 
app.use(express.json()); 

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/tabla/:name', (req, res) => {

  const { name } = req.params;

  const query = `SELECT * FROM ${name}`; 

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err.stack);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results); 
  });
});





app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  pool.end(); 
  process.exit();
});