const express = require('express');
const mongoose = require('mongoose');
const authenticate = require('../middlewares/authMiddelware'); // Import your authentication middleware

// Import your Meal model
const Meal = require('../models/Meal'); // Adjust the path as per your folder structure

// Create router
const router = express.Router();

// Middleware to use for all requests
router.use(authenticate); // Your authentication middleware

// A simple test to check our mealRoutes
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to our meals API!' });
});

// Create a new Meal
router.post('/create', async (req, res) => {
    try {
      const meal = new Meal({
        ...req.body,
        userUid: req.user.uid, // Append user UID here
      });
      await meal.save();
      res.json(meal);
    } catch (error) {
      res.status(500).send(error);
    } finally {
        console.log('Meal created successfully for user', req.user.uid);
    }
});

router.get('/all', async (req, res) => {
    try {
      const meals = await Meal.find({ userUid: req.user.uid });
      res.json(meals);
    } catch (error) {
      res.status(500).send(error);
    } finally {
        console.log('All meals fetched successfully for user', req.user.uid);
    }
});

router.get('/:id', async (req, res) => {
    try {
      const meal = await Meal.findOne({
        _id: req.params.id,
        userUid: req.user.uid,
      });
      if (!meal) res.status(404).send("No item found");
      res.json(meal);
    } catch (error) {
      res.status(500).send(error);
    } finally {
        console.log('Meal fetched successfully for user', req.user.uid, 'with id', req.params.id);
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const meal = await Meal.findOneAndDelete({
        _id: req.params.id,
        userUid: req.user.uid,
      });
      if (!meal) res.status(404).send("No item found");
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    } finally {
        console.log('Meal deleted successfully for user', req.user.uid, 'with id', req.params.id);
    }
});

router.put('/:id', async (req, res) => {
    try {
      const meal = await Meal.findOneAndUpdate(
        {
          _id: req.params.id,
          userUid: req.user.uid,
        },
        req.body,
        { new: true }
      );
      if (!meal) res.status(404).send("No item found");
      res.json(meal);
    } catch (error) {
      res.status(500).send(error);
    } finally {
        console.log('Meal updated successfully for user', req.user.uid, 'with id', req.params.id);
    }
});

// Middleware for handling errors (optional but recommended)
router.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

module.exports = router;