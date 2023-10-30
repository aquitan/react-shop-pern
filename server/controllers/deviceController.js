const { Device } = require("../models/models")
const { v4 } = require('uuid')
const path = require('path')
const ApiError = require("../error/ApiError")

const createDevice = (async (req, res, next) => {
	try {
		const { name, price, brandId, typeId, info } = req.body
		const { img } = req.files

		let fileName = v4() + ".jpg"
		img.mv(path.resolve(__dirname, '..', 'static', fileName))

		const device = await Device.create({ name, price, brandId, typeId, info, img: fileName })

		return res.json(device)
	} catch (e) {
		next(ApiError.badRequest(e.message))
	}

})

const getAllDevices = (async (req, res) => {
	const devices = await Device.findAll()

	return res.status(200).json(devices)
})

const getDevice = (async (req, res) => {
	const { id } = req.body

	const device = await Device.findOne({ id })

	return res.status(200).json(device)

})

module.exports = { createDevice, getAllDevices, getDevice };