const Store = require('../Models/stores');
const Stores = require('../Models/stores');
const mongoose = require('mongoose');

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

exports.EditStore = async (req, res) => {
    try {
        const { newAdress } = req.body;
        const { id } = req.query;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Id da loja inválido' });
        }

        if (!newAdress) {
            return res.status(400).json({ message: 'O campo "Address" é obrigatório' });
        }

        const updateStore = await Stores.findByIdAndUpdate(id, { address: newAdress }, { new: true });

        if (!updateStore) {
            return res.status(400).json({ message: 'Loja não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao atualizar endereço da loja: ', error);
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }
};

exports.RemoveStore = async (req, res) => {
    const { storeID } = req.query;

    if (!storeID) {
        return res.status(400).json({ message: 'Invalid Store ID' });
    }

    const store = await Stores.findById(storeID);

    if (!store) {
        return res.status(400).json({ message: 'Store not found' });
    }

    await Stores.deleteOne(store);

    res.json({ status: 'success', store: store });
}

exports.ReadStore = async (req, res) => {
    const { storeID } = req.query;

    if (!storeID) {
        return res.status(400).json({ message: 'Invalid Store ID' });
    }

    const store = await Stores.findById(storeID);
    if (!store) {
        return res.status(400).json({ message: 'Store not found' });
    }

    res.json({ status: 'success', store: store });
}

exports.ReadStores = async (req, res) => {
    const stores = await Stores.find();
    res.json({ status: 'success', stores: stores });
}