const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({ path: '.env' });

const app = express();

app.use(bodyParser.json());
app.use(cors());

//Routes
const mealsRoutes = require('./routes/mealRoutes');
const dailyplanmealRoutes = require('./routes/dailyplanmealRoutes');

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
});


app.use('/meals', mealsRoutes);
app.use('/daily-plans', dailyplanmealRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});