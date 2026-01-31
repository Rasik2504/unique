const mongoose = require('mongoose');

const FieldConfigSchema = new mongoose.Schema({
    fieldName: {
        type: String,
        required: true,
        unique: true
    },
    fieldType: {
        type: String,
        enum: ['text', 'number', 'select', 'date'],
        default: 'text'
    },
    options: {
        type: [String],
        default: []
    },
    required: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('FieldConfig', FieldConfigSchema);
