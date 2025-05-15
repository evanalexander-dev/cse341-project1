const mongodb = require('../db/database');
const { ObjectId } = require('mongodb');

const controller = {};

controller.getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    //#swagger.summary = 'Get all contacts'
    //#swagger.description = 'Retrieve all contacts.'
    /*#swagger.responses[200] = {
        description: 'Successfully retrieved contacts',
        schema: [
            {
                $ref: '#/components/schemas/Contact'
            }
        ]
    }*/
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then(contacts => res.json(contacts));
};

controller.getOne = async (req, res) => {
    //#swagger.tags=['Contacts']
    //#swagger.summary = 'Get contact by ID'
    //#swagger.description = 'Retrieve a specific contact by ID.'
    /*#swagger.parameters['id'] = {
        description: 'ID of the contact',
        type: 'string',
        example: '681a954e208706a4867f8ef9'
    }*/
    /*#swagger.responses[200] = {
        description: 'Successfully retrieved contact',
        schema: {
            $ref: '#/components/schemas/Contact'
        }
    }*/
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId });
    result.toArray().then(contacts => res.json(contacts[0]));
};

controller.create = async (req, res) => {
    //#swagger.tags=['Contacts']
    //#swagger.summary = 'Create a new contact'
    //#swagger.description = 'Create a new contact.'
    /*#swagger.parameters['obj'] = {
        in: 'body',
        description: 'Contact information',
        required: true,
        schema: {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.org",
            favoriteColor: "Blue",
            birthday: "January 1"
        }
    }*/
    /*#swagger.responses[201] = {
        description: 'Contact successfully created'
    }*/
    /*#swagger.responses[500] = {
        description: 'Server error while creating contact',
        schema: { 
            error: 'An error occurred while creating the contact.'
        }
    }*/
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if (result.acknowledged) {
        res.status(201).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while creating the contact.');
    }
}

controller.update = async (req, res) => {
    //#swagger.tags=['Contacts']
    //#swagger.summary = 'Update contact by ID'
    //#swagger.description = 'Update an existing contact by ID.'
    /*#swagger.parameters['id'] = {
        description: 'ID of the contact to update',
        type: 'string',
        example: '681a954e208706a4867f8ef9'
    }*/
    /*#swagger.parameters['obj'] = {
        in: 'body',
        description: 'Contact information',
        required: true,
        schema: {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.org",
            favoriteColor: "Blue",
            birthday: "January 1"
        }
    }*/
    /*#swagger.responses[204] = {
        description: 'Contact successfully updated'
    }*/
    /*#swagger.responses[500] = {
        description: 'Server error while updating contact',
        schema: { 
            error: 'An error occurred while updating the contact.'
        }
    }*/
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: contactId }, contact);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while updating the contact.');
    }
}

controller.delete = async (req, res) => {
    //#swagger.tags=['Contacts']
    //#swagger.summary = 'Delete contact by ID'
    //#swagger.description = 'Delete a contact by ID.'
    /*#swagger.parameters['id'] = {
        description: 'ID of the contact to delete',
        type: 'string',
        example: '681a954e208706a4867f8ef9'
    }*/
    /*#swagger.responses[204] = {
        description: 'Contact successfully deleted'
    }*/
    /*#swagger.responses[500] = {
        description: 'Server error while deleting contact',
        schema: { 
            error: 'An error occurred while deleting the contact.'
        }
    }*/
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId }, true);
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'An error occurred while deleting the contact.');
    }
}

module.exports = controller;
