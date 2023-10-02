/*
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../backend/.env')});

module.exports = {
    port: process.env.NODE_PORT,
    mongoose: {
        url: process.env.MONGODB_URL
    }
}
*/
const dotenv = require('dotenv')

dotenv.config()

const env = process.env

const config = {
    port: env.BACKEND_PORT,
    mongoose: {
        url: env.MONGODB_URL,
        options: {
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
}

// console.log('config', config.mongoose.url, config.port)

module.exports = config