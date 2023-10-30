const { Brand } = require("../models/models");

const createBrand = (async (req, res) => {
	const { name } = req.body
	const type = await Brand.create({ name })

	return res.status(200).json(type)
})

const getAllBrands = (async (req, res) => {
	const brands = await Brand.findAll()

	return res.status(200).json(brands)
})


module.exports = { createBrand, getAllBrands };
