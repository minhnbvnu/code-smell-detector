function Sync(method, model, opts) {
	var table =  model.config.adapter.collection_name,
		columns = model.config.columns,
		dbName = model.config.adapter.db_name || ALLOY_DB_DEFAULT,
		resp = null,
		db, sql;

	switch (method) {
		case 'create':
		case 'update':
			resp = (function() {
				var attrObj = {};

				if (!model.id) {
					model.id = model.idAttribute === ALLOY_ID_DEFAULT ? guid() : null;
					attrObj[model.idAttribute] = model.id;
					backbone.VERSION === '0.9.2' ? model.set(attrObj, { silent: true }) : model.set(attrObj);
				}

				// assemble columns and values
				var names = [], values = [], q = [];
				for (var k in columns) {
					names.push(k);
					values.push(model.get(k));
					q.push('?');
				}

				// execute the query
				sql = 'REPLACE INTO ' + table + ' (' + names.join(',') + ') VALUES (' + q.join(',') + ');';
				db = getDatabase(dbName);
				db.execute(sql, values);

				// if model.id is still null, grab the last inserted id
				if (model.id === null) {
					model.id = db.lastInsertRowId;
					attrObj[model.idAttribute] = model.id;
					backbone.VERSION === '0.9.2' ? model.set(attrObj, { silent: true }) : model.set(attrObj);
				}

				return model.toJSON();
			})();
			break;

		case 'read':
			// print warning about using both id and query
			if (opts.query && opts.id) {
				Ti.API.warn('Both "query" and "id" options were specified for model.fetch(). "id" will be ignored.');
			}

			// determine the query to execute
			sql = 'SELECT * FROM ' + table;
			if (opts.query) {
				sql = opts.query;
			} else if (opts.id) {
				sql += ' WHERE ' + (model.idAttribute ? model.idAttribute : ALLOY_ID_DEFAULT) + ' = ' + (_.isString(opts.id) ? '"' + opts.id + '"' : opts.id);
			}

			// execute the select query
			db = getDatabase(dbName);
			var rs;

			// is it a string or a prepared statement?
			if (_.isString(sql)) {
				rs = db.execute(sql);
			} else {
				rs = db.execute(sql.statement, sql.params);
			}

			var values = [];
			var fieldNames = [];
			var fieldCount = _.isFunction(rs.fieldCount) ? rs.fieldCount() : rs.fieldCount;
			var i = 0;

			for (; i < fieldCount; i++) {
				fieldNames.push(rs.fieldName(i));
			}

			// iterate through all queried rows
			while (rs.isValidRow()) {
				var o = {};
				for (i = 0; i < fieldCount; i++) {
					o[fieldNames[i]] = rs.field(i);
				}
				values.push(o);
				rs.next();
			}
			rs.close();

			// shape response based on whether it's a model or collection
			var len = values.length;

			if (backbone.VERSION === '0.9.2') {
				model.length = len;
			}

			resp = (len === 1) ? values[0] : values;
			break;

		case 'delete':
			sql = 'DELETE FROM ' + table + ' WHERE ' + model.idAttribute + '=?';

			// execute the delete
			db = getDatabase(dbName);
			db.execute(sql, model.id);

			resp = model.toJSON();
			break;
	}

	// process success/error handlers, if present
	if (resp) {
		if (_.isFunction(opts.success)) { opts.success(resp); }
		if (method === 'read' && !opts.silent) { model.trigger('fetch', { fromAdapter: true }); }
	} else {
		if (_.isFunction(opts.error)) { opts.error(resp); }
	}

}