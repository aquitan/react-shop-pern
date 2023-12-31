const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const { User, Basket } = require('../models/models')
const jwt = require('jsonwebtoken')


const generateJwt = (id, email, role) => {
	return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

const registration = (async (req, res, next) => {
	const { email, password, role } = req.body

	if (!email || !password) {
		return next(ApiError.internalError('Неверно указаны логин или пароль'))
	}
	const candidate = await User.findOne({ where: { email } })

	if (candidate) {
		return next(ApiError.internalError('Пользователь с таким email уже существует'))
	}

	const hashPassword = await bcrypt.hash(password, 5)
	const user = await User.create({ email, password: hashPassword, role })
	const basket = await Basket.create({ userId: user.id })
	const token = generateJwt(user.id, user.email, user.role)

	return res.json({ token })

})

const login = (async (req, res, next) => {
	const { email, password } = req.body
	const user = await User.findOne({ where: { email } })

	if (!user) {
		return next(ApiError.internalError('Пользователь с таким email не найден'))
	}

	let comparePassword = bcrypt.compareSync(password, user.password)
	if (!comparePassword) {
		return next(ApiError.internalError('Неверный пароль'))
	}

	const token = generateJwt(user.id, user.email, user.role)

	return res.json({ token })

})

const check = (async (req, res, next) => {
	const token = generateJwt(req.user.id, req.user.email, req.user.role)
	return res.json({ token })
})

module.exports = { registration, login, check }