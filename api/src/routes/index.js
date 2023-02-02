const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const itemsRoutes = require('./items');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', function(req, res, next) {
  res.send('Hello')
})
router.use('/items', itemsRoutes);

module.exports = router;