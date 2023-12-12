const Router = require('express')
const router = new Router()
const { createType, getAllTypes } = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')
// const typeController = require('../controllers/typeController')

router.post('/', checkRole('ADMIN'), createType)
router.get('/', getAllTypes)

module.exports = router;