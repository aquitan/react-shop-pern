const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
require('dotenv').config()

const PORT = process.env.PORT || 7000



const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок, последний middleware
app.use(errorHandler)

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync() // сверяет состояние БД со схемой данных

		app.listen(PORT, () => {
			console.log(`-------Hello Server! Port ${PORT}`)
		})

	} catch(e) {
		console.log('error', e)
	}
}

start()