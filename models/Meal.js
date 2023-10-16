const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  ingredients: [String],
  instructions: String,
  date: {
    type: Date,
    default: Date.now,
  },
  calories: Number,
  image: String,
  userUid: { // user reference
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Meal', MealSchema);