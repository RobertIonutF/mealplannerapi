const mongoose = require('mongoose');

const DailyPlanSchema = new mongoose.Schema({
    breakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
    lunch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
    dinner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
    snack: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
    date: {
        type: Date,
        default: Date.now,
    },
    userUid: { 
        type: String,
        required: true,
    },
});


module.exports = mongoose.model('DailyPlan', DailyPlanSchema);