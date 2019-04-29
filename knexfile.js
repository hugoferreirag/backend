const { db } = require('./.env')

module.exports = {
	client: 'postgresql',
	connection: {
		database:'d7odmjh3lbkpu4',
		user:'tfiyyqarmnrqpm',
		password:'9a1cfa67136ba61be1dc264cf0e3090fd7d3e34c708ef1b4bafefe0d681be2eb'
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};
