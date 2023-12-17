const Router = require('express')
const router = new Router()
const { updateRating } = require('../controllers/ratingController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.patch('/', updateRating)

module.exports = router;