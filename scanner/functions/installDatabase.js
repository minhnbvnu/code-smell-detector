function installDatabase(config) {
	// get the database name from the db file path
	var dbFile = _.isFunction(config.adapter.db_file) ? config.adapter.db_file(config) : config.adapter.db_file;
	var table = config.adapter.collection_name;

	var rx = /(^|.*\/)([^\/]+)\.[^\/]+$/;
	var match = dbFile.match(rx);
	if (match === null) {
		throw 'Invalid sql database filename "' + dbFile + '"';
	}
	//var isAbsolute = match[1] ? true : false;
	config.adapter.db_name = config.adapter.db_name || match[2];
	var dbName = config.adapter.db_name;

	// install and open the preloaded db
	Ti.API.debug('Installing sql database "' + dbFile + '" with name "' + dbName + '"');
	var db = Ti.Database.install(dbFile, dbName);
	cache.db[dbName] = db;

	// set remoteBackup status for iOS
	if (config.adapter.remoteBackup === false && OS_IOS) {
		Ti.API.debug('iCloud "do not backup" flag set for database "' + dbFile + '"');
		db.file.setRemoteBackup(false);
	}

	// compose config.columns from table definition in database
	var rs = db.execute('pragma table_info("' + table + '");');
	var columns = {}, cName, cType;
	if (rs) {
		while (rs.isValidRow()) {
			cName = rs.fieldByName('name');
			cType = rs.fieldByName('type');
			columns[cName] = cType;

			// see if it already has the ALLOY_ID_DEFAULT
			if (cName === ALLOY_ID_DEFAULT && !config.adapter.idAttribute) {
				config.adapter.idAttribute = ALLOY_ID_DEFAULT;
			}

			rs.next();
		}
		rs.close();
	}
	if (Object.keys(columns).length === 0) {
		var idAttribute = (config.adapter.idAttribute) ? config.adapter.idAttribute : ALLOY_ID_DEFAULT;
		for (var k in config.columns) {
			cName = k;
			cType = config.columns[k];

			// see if it already has the ALLOY_ID_DEFAULT
			if (cName === ALLOY_ID_DEFAULT && !config.adapter.idAttribute) {
				config.adapter.idAttribute = ALLOY_ID_DEFAULT;
			} else if (k === config.adapter.idAttribute) {
				cType += ' UNIQUE';
			}
			columns[cName] = cType;
		}
	}
	config.columns = columns;

	// make sure we have a unique id field
	if (config.adapter.idAttribute) {
		if (!_.contains(_.keys(config.columns), config.adapter.idAttribute)) {
			throw 'config.adapter.idAttribute "' + config.adapter.idAttribute + '" not found in list of columns for table "' + table + '"\n' +
				'columns: [' + _.keys(config.columns).join(',') + ']';
		}
	} else {
		Ti.API.info('No config.adapter.idAttribute specified for table "' + table + '"');
		Ti.API.info('Adding "' + ALLOY_ID_DEFAULT + '" to uniquely identify rows');

		var fullStrings = [],
			colStrings = [];
		_.each(config.columns, function(type, name) {
			colStrings.push(name);
			fullStrings.push(name + ' ' + type);
		});
		var colsString = colStrings.join(',');
		db.execute('ALTER TABLE ' + table + ' RENAME TO ' + table + '_temp;');
		db.execute('CREATE TABLE ' + table + '(' + fullStrings.join(',') + ',' + ALLOY_ID_DEFAULT + ' TEXT UNIQUE);');
		db.execute('INSERT INTO ' + table + '(' + colsString + ',' + ALLOY_ID_DEFAULT + ') SELECT ' + colsString + ',CAST(_ROWID_ AS TEXT) FROM ' + table + '_temp;');
		db.execute('DROP TABLE ' + table + '_temp;');
		config.columns[ALLOY_ID_DEFAULT] = 'TEXT UNIQUE';
		config.adapter.idAttribute = ALLOY_ID_DEFAULT;
	}
}