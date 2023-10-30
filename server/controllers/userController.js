const ApiError = require("../error/ApiError")

const registration = (async (req, res) => {

})

const login = (async (req, res) => {

})

const check = (async (req, res, next) => {
	const { id } = req.query

	if (!id) {
		return next(ApiError.badRequest('Не задан id'))
	}

	res.json({ message: 'Success' })
})

module.exports = { registration, login, check }