const Store = require('../Models/stores');
const Stores = require('../Models/stores');
const mongoose = require('mongoose');

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new store
 *     description: Endpoint to create a new store.
 *     tags:
 *       - Stores
 *     requestBody:
 *       description: Store creation data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - address
 *               - phone
 *               - email
 *     responses:
 *       '200':
 *         description: Store created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                 Stores:
 *                   type: object
 *                   // Define your store properties here
 *       '400':
 *         description: Bad Request - Invalid or missing input data
 *       '500':
 *         description: Internal Server Error - Failed to create the store
 */
exports.CreateStore = async (req, res) => {
    const { name, address, phone, email } = req.body;

    if (!name || !address || !phone || !email) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    const response = await Stores.create({
        name,
        address,
        phone,
        email
    });

    res.json({ status: 'success', Stores: response });
}

/**
 * @swagger
 * /:
 *   put:
 *     summary: Edit store information
 *     description: Endpoint to edit the information of an existing store.
 *     tags:
 *       - Stores
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID of the store to edit
 *         required: true
 *         schema:
 *           type: string
 *       - name: newAddress
 *         in: body
 *         description: New address for the store
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             newAddress:
 *               type: string
 *             newName:
 *               type: string
 *             newPhone:
 *               type: string
 *             newEmail:
 *               type: string
 *     responses:
 *       '200':
 *         description: Store information edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                 store:
 *                   type: object
 *                   // Define your store properties here
 *       '400':
 *         description: Bad Request - Invalid or missing input data
 *       '404':
 *         description: Not Found - Store not found
 *       '500':
 *         description: Internal Server Error - Failed to edit store information
 */
exports.EditStore = async (req, res) => {
    try {
        const { newAddress, newName, newPhone, newEmail } = req.body;
        const { id } = req.query;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Invalid Store ID' });
        }

        if (!newAddress && !newName && !newPhone && !newEmail) {
            return res.status(400).json({ msg: 'At least one field must be provided' });
        }

        const updateFields = {};
        if (newAddress) {
            updateFields.address = newAddress;
        }
        if (newName) {
            updateFields.name = newName;
        }
        if (newPhone) {
            updateFields.phone = newPhone;
        }
        if (newEmail) {
            updateFields.email = newEmail;
        }

        const updatedStore = await Stores.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedStore) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        res.json({ status: 'success', store: updatedStore });
    } catch (error) {
        console.error('Error updating store information: ', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Remove a store
 *     description: Endpoint to remove an existing store.
 *     tags:
 *       - Stores
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID of the store to remove
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Store removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                 store:
 *                   type: object
 *                   // Define your store properties here
 *       '400':
 *         description: Bad Request - Invalid store ID
 *       '404':
 *         description: Not Found - Store not found
 *       '500':
 *         description: Internal Server Error - Failed to remove the store
 */
exports.RemoveStore = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: 'Invalid Store ID' });
    }

    const store = await Stores.findById(id);

    if (!store) {
        return res.status(400).json({ message: 'Store not found' });
    }

    await Stores.deleteOne(store);

    res.json({ status: 'success', store: store });
}

/**
 * @swagger
 * /ReadStore/{id}:
 *   get:
 *     summary: Get store information
 *     description: Endpoint to retrieve information for an existing store.
 *     tags:
 *       - Stores
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the store to retrieve information
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Store information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                 store:
 *                   type: object
 *                   // Define your store properties here
 *       '400':
 *         description: Bad Request - Invalid store ID
 *       '404':
 *         description: Not Found - Store not found
 *       '500':
 *         description: Internal Server Error - Failed to retrieve store information
 */
exports.ReadStore = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Invalid Store ID' });
    }

    const store = await Stores.findById(id);
    if (!store) {
        return res.status(400).json({ message: 'Store not found' });
    }

    res.json({ status: 'success', store: store });
}

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all stores
 *     description: Endpoint to retrieve information for all existing stores.
 *     tags:
 *       - Stores
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - name: limit
 *         in: query
 *         description: Number of stores per page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *     responses:
 *       '200':
 *         description: Stores information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                 stores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     // Define your store properties here
 *       '500':
 *         description: Internal Server Error - Failed to retrieve stores information
 */
exports.ReadStores = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || Number.MAX_SAFE_INTEGER;
    const startIndex = (page - 1) * limit;

    try {
        const stores = await Stores.find().skip(startIndex).limit(limit);
        const totalStores = await Stores.countDocuments();

        const pagination = {
            currentPage: page,
            totalPages: Math.ceil(totalStores / limit),
            totalStores: totalStores,
        };

        res.json({ status: "success", stores: stores, pagination: pagination });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};


exports.CountStores = async (req, res) => {
    try {
        const totalStores = await Store.countDocuments();
        res.json({ status: 200, message: 'Count retrieved successfully', data: { totalStores } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Error counting stores', data: {} });
    }
};