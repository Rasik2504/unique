const mongoose = require('mongoose');

const DailyDataSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Please provide a date'],
        index: true
    },
    enteredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, {
    timestamps: true,
    strict: false
});

// Index for efficient querying by date and user
DailyDataSchema.index({ date: 1, enteredBy: 1 });

// Virtual for total amount
DailyDataSchema.virtual('totalAmount').get(function () {
    return this.quantity * this.price;
});

// Ensure virtuals are included in JSON
DailyDataSchema.set('toJSON', { virtuals: true });
DailyDataSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('DailyData', DailyDataSchema);
