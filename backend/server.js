const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/product.route.js'));
mongoose.connect('mongodb://localhost:27017/ProductDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});