module.exports = {
    development: {
        client: 'pg',
        connection: ''
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }
}