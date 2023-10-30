const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')


const createType = (async (req, res) => {
	const { name } = req.body
	const type = await Type.create({ name })

	return res.json(type)
})

const getAllTypes = (async (req, res) => {
	const type = await Type.findAll()

	return res.status(200).json(type)
})


module.exports = { createType, getAllTypes }

// class TypeController {
// 	async createType(req, res) {
// 		const { name } = req.body
// 		const type = await Type.create({ name })
// 		return res.json(type)
// 	}

// 	async getAllTypes(req, res) {

// 		const type = await Type.findAll()

// 		return res.json(type)
// 	}
// }

// module.exports = new TypeController()
