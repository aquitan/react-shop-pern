const { Rating, Device } = require('../models/models')
const ApiError = require('../error/ApiError')


const updateRating = (async (req, res, next) => {

	const { userId, deviceId, rate } = req.body

	const checkRating = await Rating.findOne({ where: { userId } })

	if (checkRating) {
		return next(ApiError.badRequest('Вы уже ставили оценку'))
	}

	const rating = await Rating.create({ userId, deviceId, rate })
	const device = await Device.findOne({ where: { id: deviceId } })
	await device.update({ rating: rate })
	await device.save()

	return res.status(200).json({ rating })
})


module.exports = { updateRating }