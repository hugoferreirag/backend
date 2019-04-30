

/* ***development **-/module.exports = {
	client: 'postgresql',
	connection: {
		database:'knowledge_final',
		user:'postgres',
		password:''
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};*/
module.exports = {
	production:{
	client: 'postgres',
	connection: process.env.DATABASE_URL,

	migrations: {
		directory: __dirname + '/migrations'
	}
}
};
