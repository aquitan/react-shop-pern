const Router = require('express')
const router = new Router()
const { createDevice, getAllDevices, getDevice } = require('../controllers/deviceController')


router.post('/', createDevice)
router.get('/', getAllDevices)
router.get('/:id', getDevice)

module.exports = router;