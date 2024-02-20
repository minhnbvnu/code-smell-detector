function replaceParams(sql, params) {
	if (!params) return sql;
	let paramIndex = 0;
	sql = sql.replace(/('[^'\\]*(?:\\.[^'\\]*)*')|("[^"\\]*(?:\\.[^"\\]*)*")|(\?\?)|(\?)/g, str => {
		if (paramIndex >= params.length) return str;
		if (/".*"/g.test(str) || /'.*'/g.test(str)) {
			return str;
		}
		if (str === '??') {
			const val = params[paramIndex++];
			if (val instanceof Array) {
				return `(${val.map(item => replaceParams('??', [item])).join(',')})`;
			} else if (val === '*') {
				return val;
			} else if (typeof val === 'string' && val.includes('.')) {
				const _arr = val.split('.');
				return replaceParams(_arr.map(() => '??').join('.'), _arr);
			} else if (typeof val === 'string' && (val.includes(' as ') || val.includes(' AS '))) {
				const newVal = val.replace(' as ', ' AS ');
				const _arr = newVal.split(' AS ');
				return replaceParams(_arr.map(() => '??').join(' AS '), _arr);
			} else {
				return ['`', val, '`'].join('');
			}
		}
		const val = params[paramIndex++];
		if (val === null) return 'NULL';
		switch (typeof val) {
			case 'object':
				if (val instanceof Date) return `"${formatDate(val)}"`;
				if (val instanceof Array) {
					return `(${val.map(item => replaceParams('?', [item])).join(',')})`;
				}
			case 'string':
				return `"${escapeString(val)}"`;
			case 'undefined':
				return 'NULL';
			case 'number':
			case 'boolean':
			default:
				return val;
		}
	});
	return sql;
}