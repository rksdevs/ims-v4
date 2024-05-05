const mongoose = require("mongoose")

const connectToDb = async() => {
    try {
        let db = await mongoose.connect(process.env.DB_CONNECTION_PROD);
        console.log(`DB Connected, Host: ${db.connection.host}, Port: ${db.connection.port}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectToDb;