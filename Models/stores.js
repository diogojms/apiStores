'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
    },
    { collection: 'Stores' }
);

const Store = mongoose.model('Store', StoreSchema);

module.exports = Store;