const mongoose = require('mongoose');

const connection = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`mongodb connect: ${con.connection.host}`)
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = connection