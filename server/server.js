const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
//const routesUrls = require('./routes/routes')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
//const {addCommentToPost} = require('./routes/controller')

dotenv.config()

mongoose.connect(process.env.DATABASE_URL, () => console.log('database connected'))

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser())

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));

app.use('/', userRoutes)
//app.use('/comments/:id', addCommentToPost)

app.listen(4000, () => console.log('Server is running'))