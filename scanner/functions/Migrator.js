function Migrator(config, transactionDb) {
	this.db = transactionDb;
	this.dbname = config.adapter.db_name;
	this.table = config.adapter.collection_name;
	this.idAttribute = config.adapter.idAttribute;

	//TODO: normalize columns at compile time - https://jira.appcelerator.org/browse/ALOY-222
	this.column = function(name) {
		// split into parts to keep additional column characteristics like
		// autoincrement, primary key, etc...
		var parts = name.split(/\s+/);
		var type = parts[0];
		switch (type.toLowerCase()) {
			case 'string':
			case 'varchar':
			case 'date':
			case 'datetime':
				Ti.API.warn('"' + type + '" is not a valid sqlite field, using TEXT instead');
			case 'text':
				type = 'TEXT';
				break;
			case 'int':
			case 'tinyint':
			case 'smallint':
			case 'bigint':
			case 'boolean':
				Ti.API.warn('"' + type + '" is not a valid sqlite field, using INTEGER instead');
			case 'integer':
				type = 'INTEGER';
				break;
			case 'double':
			case 'float':
			case 'decimal':
			case 'number':
				Ti.API.warn('"' + name + '" is not a valid sqlite field, using REAL instead');
			case 'real':
				type = 'REAL';
				break;
			case 'blob':
				type = 'BLOB';
				break;
			case 'null':
				type = 'NULL';
				break;
			default:
				type = 'TEXT';
				break;
		}
		parts[0] = type;
		return parts.join(' ');
	};

	this.createTable = function(config) {
		// compose the create query
		var columns = [];
		var found = false;
		for (var k in config.columns) {
			if (k === this.idAttribute) { found = true; }
			columns.push(k + ' ' + this.column(config.columns[k]));
		}

		// add the id field if it wasn't specified
		if (!found && this.idAttribute === ALLOY_ID_DEFAULT) {
			columns.push(ALLOY_ID_DEFAULT + ' TEXT UNIQUE');
		}
		var sql = 'CREATE TABLE IF NOT EXISTS ' + this.table + ' ( ' + columns.join(',') + ')';

		// execute the create
		this.db.execute(sql);
	};

	this.dropTable = function() {
		this.db.execute('DROP TABLE IF EXISTS ' + this.table);
	};

	this.insertRow = function(columnValues) {
		var columns = [];
		var values = [];
		var qs = [];

		// get arrays of column names, values, and value placeholders
		var found = false;
		for (var key in columnValues) {
			if (key === this.idAttribute) { found = true; }
			columns.push(key);
			values.push(columnValues[key]);
			qs.push('?');
		}

		// add the id field if it wasn't specified
		if (!found && this.idAttribute === ALLOY_ID_DEFAULT) {
			columns.push(this.idAttribute);
			values.push(guid());
			qs.push('?');
		}

		// construct and execute the query
		this.db.execute('INSERT INTO ' + this.table + ' (' + columns.join(',') + ') VALUES (' + qs.join(',') + ');', values);
	};

	this.deleteRow = function(columns) {
		var sql = 'DELETE FROM ' + this.table;
		var keys = _.keys(columns);
		var len = keys.length;
		var conditions = [];
		var values = [];

		// construct the where clause, if necessary
		if (len) { sql += ' WHERE '; }
		for (var i = 0; i < len; i++) {
			conditions.push(keys[i] + ' = ?');
			values.push(columns[keys[i]]);
		}
		sql += conditions.join(' AND ');

		// execute the delete
		this.db.execute(sql, values);
	};
}