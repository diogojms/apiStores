const Store = require('../Models/stores');
const Stores = require('../Models/stores');
const mongoose = require('mongoose');

/**
 * @swagger
 * /stores/create:
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
 * /stores/edit:
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
        const { newAddress } = req.body;
        const { id } = req.query;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Id da loja inválido' });
        }

        if (!newAddress) {
            return res.status(400).json({ msg: 'O campo "Address" é obrigatório' });
        }

        const updateStore = await Stores.findByIdAndUpdate(id, { address: newAddress }, { new: true });

        if (!updateStore) {
            return res.status(404).json({ msg: 'Loja não encontrada' });
        }
        res.json({ status: 'success', store: updateStore })
    } catch (error) {
        console.error('Erro ao atualizar endereço da loja: ', error);
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }
};

/**
 * @swagger
 * /stores/remove:
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
 * /stores/read:
 *   get:
 *     summary: Get store information
 *     description: Endpoint to retrieve information for an existing store.
 *     tags:
 *       - Stores
 *     parameters:
 *       - name: id
 *         in: query
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
    const { id } = req.query;

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
 * /stores/readAll:
 *   get:
 *     summary: Get all stores
 *     description: Endpoint to retrieve information for all existing stores.
 *     tags:
 *       - Stores
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
    const stores = await Stores.find();
    res.json({ status: 'success', stores: stores });
}