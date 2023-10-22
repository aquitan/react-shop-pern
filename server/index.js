const express = require('express')
const dotenv = require('dotenv')
const sequelize = require('./db')

dotenv.config({path: './.env'})

const PORT = process.env.PORT || 7000



const app = express()

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync() // сверяет состояние БД со схемой данных

		app.listen(PORT, () => {
			console.log(`Hello Server! Port ${PORT}`)
		})

	} catch(e) {

	}
}

start()