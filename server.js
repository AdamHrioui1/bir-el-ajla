const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connection = require('./database/connection');
const path = require('path')


const app = express()
connection()

app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api', require('./routes/clientRoutes'))
app.use('/api', require('./routes/factureRoutes'))
app.use('/admin', require('./routes/adminRoutes'))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('my_ancle/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'my_ancle', 'build', 'index.html'))
    })
}

app.listen(process.env.PORT, () => console.log(`Server is listening on port: http://localhost:${process.env.PORT}`))