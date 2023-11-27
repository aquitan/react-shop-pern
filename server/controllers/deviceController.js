const { Device, DeviceInfo } = require("../models/models")
const { v4 } = require('uuid')
const path = require('path')
const ApiError = require("../error/ApiError")

const createDevice = (async (req, res, next) => {
	try {
		let { name, price, brandId, typeId, info } = req.body
		const { img } = req.files

		let fileName = v4() + ".jpg"
		img.mv(path.resolve(__dirname, '..', 'static', fileName))

		const device = await Device.create({ name, price, brandId, typeId, img: fileName })

		if (info) {
			info = JSON.parse(info)
			info.forEach(i => {
				DeviceInfo.create({
					title: i.title,
					description: i.description,
					deviceId: device.id
				})
			})
		}

		return res.json(device)
	} catch (e) {
		next(ApiError.badRequest(e.message))
	}

})

const getAllDevices = (async (req, res) => {
	let { brandId, typeId, page, limit } = req.query

	page = page || 1

	limit = limit || 9

	let offset = page * limit - limit

	let devices;

	if (!brandId && !typeId) {
		devices = await Device.findAndCountAll({ page, offset })
	}

	if (brandId && !typeId) {
		devices = await Device.findAndCountAll({ where: { brandId }, page, offset })
	}
	if (!brandId && typeId) {
		devices = await Device.findAndCountAll({ where: { typeId }, page, offset })
	}
	if (brandId && typeId) {
		devices = await Device.findAndCountAll({ where: { brandId, typeId }, page, offset })
	}


	return res.status(200).json(devices)




})

const getDevice = (async (req, res) => {
	const { id } = req.params

	const device = await Device.findOne(
		{
			where: { id },
			include: [{ model: DeviceInfo, as: 'info' }]
		}
	)

	return res.status(200).json(device)

})

module.exports = { createDevice, getAllDevices, getDevice };