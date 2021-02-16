import express from 'express'
import routes from './routes'
var cors = require('cors')

const app = express()
require('dotenv').config()

var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}

app.use(cors(corsOptions))
app.use(express.static('public'))
app.use(express.json())
app.use(routes)
app.listen(process.env.PORT || 3000)