const Router = require('express')
const router = new Router()
const { createDevice, getAllDevices, getDevice } = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), createDevice)
router.get('/', getAllDevices)
router.get('/:id', getDevice)

module.exports = router;