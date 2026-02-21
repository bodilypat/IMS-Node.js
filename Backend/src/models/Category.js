//src/models/Category.js

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categor_name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
}, {
    timestamps: { createdAt: 'created_at', updatedAt: false }
});

module.exports = mongoose.model('Category', categorySchema);
