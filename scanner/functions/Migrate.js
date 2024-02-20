function Migrate(Model) {
	// get list of migrations for this model
	var migrations = Model.migrations || [];

	// get a reference to the last migration
	var lastMigration = {};
	if (migrations.length) { migrations[migrations.length - 1](lastMigration); }

	// Get config reference
	var config = Model.prototype.config;

	// Get the db name for this model and set up the sql migration obejct
	config.adapter.db_name = config.adapter.db_name || ALLOY_DB_DEFAULT;
	var migrator = new Migrator(config);

	// Get the migration number from the config, or use the number of
	// the last migration if it's not present. If we still don't have a
	// migration number after that, that means there are none. There's
	// no migrations to perform.
	var targetNumber = typeof config.adapter.migration === 'undefined' ||
		config.adapter.migration === null ? lastMigration.id : config.adapter.migration;
	if (typeof targetNumber === 'undefined' || targetNumber === null) {
		var tmpDb = getDatabase(config.adapter.db_name);
		migrator.db = tmpDb;
		migrator.createTable(config);
		return;
	}
	targetNumber = targetNumber + ''; // ensure that it's a string

	// Create the migration tracking table if it doesn't already exist.
	// Get the current saved migration number.
	var currentNumber = GetMigrationFor(config.adapter.db_name, config.adapter.collection_name);

	// If the current and requested migrations match, the data structures
	// match and there is no need to run the migrations.
	var direction;
	if (currentNumber === targetNumber) {
		return;
	} else if (currentNumber && currentNumber > targetNumber) {
		direction = 0; // rollback
		migrations.reverse();
	} else {
		direction = 1;  // upgrade
	}

	// open db for our migration transaction
	var db = getDatabase(config.adapter.db_name);
	migrator.db = db;
	db.execute('BEGIN;');

	// iterate through all migrations based on the current and requested state,
	// applying all appropriate migrations, in order, to the database.
	if (migrations.length) {
		for (var i = 0; i < migrations.length; i++) {
			// create the migration context
			var migration = migrations[i];
			var context = {};
			migration(context);

			// if upgrading, skip migrations higher than the target
			// if rolling back, skip migrations lower than the target
			if (direction) {
				if (context.id > targetNumber) { break; }
				if (context.id <= currentNumber) { continue; }
			} else {
				if (context.id <= targetNumber) { break; }
				if (context.id > currentNumber) { continue; }
			}

			// execute the appropriate migration function
			var funcName = direction ? 'up' : 'down';
			if (_.isFunction(context[funcName])) {
				context[funcName](migrator, config);
			}
		}
	} else {
		migrator.createTable(config);
	}

	// update the saved migration in the db
	db.execute('DELETE FROM migrations where model = ?', config.adapter.collection_name);
	db.execute('INSERT INTO migrations VALUES (?,?)', targetNumber, config.adapter.collection_name);

	// end the migration transaction
	db.execute('COMMIT;');
	migrator.db = null;
}