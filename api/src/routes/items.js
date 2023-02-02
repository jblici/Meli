const { Router } = require('express');
const router = Router();
const { getAllItems, getItem } = require('../controllers/items');

router.get('/', getAllItems);
router.get('/:id', getItem);

module.exports = router;