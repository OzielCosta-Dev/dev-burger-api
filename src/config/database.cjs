module.exports = {
    dialect:'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'dev-burger-db',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
}