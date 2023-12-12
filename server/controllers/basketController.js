const { Device, Basket, User, BasketDevice } = require("../models/models");
const jwt = require('jsonwebtoken')

const addDevice = (async (req, res) => {
	const { deviceId } = req.body
	const token = req.headers.authorization.split(' ')[1]

	if (!token) {
		return res.status(500).json({ message: 'Внутренняя ошибка' })
	}

	const decoded = jwt.verify(token, process.env.SECRET_KEY)

	const basket = await Basket.findOne({ where: { userId: decoded.id } })

	if (!basket) {
		return res.status(500).json({ message: 'Корзина не найдена' })
	}

	const basketDevice = await BasketDevice.create({ deviceId, basketId: basket.id })

	return res.status(200).json({ basketDevice })
})

const getAllDevice = (async (req, res) => {
	const { id } = req.params

	const user = await User.findOne({ where: { id } })
	if (!user) {
		return res.status(500).json({ message: 'Внутренняя ошибка' })
	}

	const basket = await Basket.findOne({ where: { userId: user.id } })
	if (!basket) {
		return res.status(500).json({ message: 'Внутренняя ошибка' })
	}

	const basketDevices = await BasketDevice.findAll({ where: { basketId: basket.id } })
	if (!basketDevices) {
		return res.status(500).json({ message: 'Внутренняя ошибка' })
	}

	const arr = basketDevices.map((item) => {
		return item.deviceId
	})

	const devices = await Device.findAll({ where: { id: arr } })
	if (!devices) {
		return res.status(500).json({ message: 'Внутренняя ошибка' })
	}

	return res.status(200).json({ devices })
})


module.exports = { addDevice, getAllDevice };
