const Router = require('express')
const router = new Router()
const { createDevice, getAllDevices, getDevice, deleteDevice } = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), createDevice)
router.get('/', getAllDevices)
router.get('/:id', getDevice)
router.delete('/:id', deleteDevice)

module.exports = router;