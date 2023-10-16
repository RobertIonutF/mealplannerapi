const express = require('express');
const authenticate = require('../middlewares/authMiddelware'); // adjust path as needed
const DailyPlan = require('../models/DailyPlan'); // adjust path as needed

const router = express.Router();

router.use(authenticate);

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to our daily plans API!' });
});

// Create a new DailyPlan
router.post('/create', async (req, res) => {
    try {
      const dailyPlan = new DailyPlan({
        ...req.body,
        userUid: req.user.uid, // Append user UID here
      });
      await dailyPlan.save();
      res.json(dailyPlan);
    } catch (error) {
      res.status(500).send(error);
    }
});

// Retrieve all DailyPlans for a user
router.get('/all', async (req, res) => {
    try {
      const dailyPlans = await DailyPlan.find({ userUid: req.user.uid }).populate('breakfast lunch dinner snack');
      res.json(dailyPlans);
    } catch (error) {
      res.status(500).send(error);
    }
});

// Retrieve a DailyPlan by ID
router.get('/:id', async (req, res) => {
    try {
      const dailyPlan = await DailyPlan.findOne({
        _id: req.params.id,
        userUid: req.user.uid,
      }).populate('breakfast lunch dinner snack');
      if (!dailyPlan) res.status(404).send("No item found");
      res.json(dailyPlan);
    } catch (error) {
      res.status(500).send(error);
    }
});

// Update a DailyPlan by ID
router.put('/:id', async (req, res) => {
    try {
      const dailyPlan = await DailyPlan.findOneAndUpdate({
        _id: req.params.id,
        userUid: req.user.uid,
      }, req.body, { new: true });
      if (!dailyPlan) res.status(404).send("No item found");
      res.json(dailyPlan);
    } catch (error) {
      res.status(500).send(error);
    }
});

// Delete a DailyPlan by ID
router.delete('/:id', async (req, res) => {
    try {
      const dailyPlan = await DailyPlan.findOneAndDelete({
        _id: req.params.id,
        userUid: req.user.uid,
      });
      if (!dailyPlan) res.status(404).send("No item found");
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
});

module.exports = router;