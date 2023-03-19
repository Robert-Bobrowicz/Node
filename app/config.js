require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.DATABASE,
    sessionKeySecret: process.env.SESSION_KEY_SECRET
};