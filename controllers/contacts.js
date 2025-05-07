const mongodb = require('../db/database');
const { ObjectId } = require('mongodb');

const controller = {};

controller.getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then(contacts => res.json(contacts));
};

controller.getOne = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId });
    result.toArray().then(contacts => res.json(contacts[0]));
};

module.exports = controller;