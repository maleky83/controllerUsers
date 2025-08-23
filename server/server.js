require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./Routes/routeUser');
const path = require('path');
const port = process.env.Port || 3000;

const app = express();
mongoose
  .connect(process.env.dbU)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => console.log('Server running on port ' + port));
  })
  .catch(err => console.log('DB error: ' + err));

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../')));
app.use(express.static(path.join(__dirname, '../client')));

app.use('/users', router);
