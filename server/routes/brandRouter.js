const Router = require('express')
const router = new Router()
const { createBrand, getAllBrands } = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), createBrand)
router.get('/', getAllBrands)

module.exports = router;