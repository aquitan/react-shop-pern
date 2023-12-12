const Router = require('express')
const router = new Router()
const { addDevice, getAllDevice } = require('../controllers/basketController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', addDevice)
router.get('/:id', checkRole('ADMIN'), getAllDevice)

module.exports = router;