const router = require('express').Router();
const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getOne);

module.exports = router;