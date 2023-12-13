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

exports.ReadStores = async (req, res) => {
    const stores = await Stores.find();
    res.json({ status: 'success', stores: stores });
}