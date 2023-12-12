'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: { String, required: true },
        phone: { String, required: true },
        email: { String, required: true },
    },
    { collection: 'Stores' }
);

const Store = mongoose.model('Store', StoreSchema);

module.exports = Store;