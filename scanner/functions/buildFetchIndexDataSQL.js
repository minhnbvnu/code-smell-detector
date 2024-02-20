function buildFetchIndexDataSQL (
    nullDisallowed, index, range, opType, multiChecks
) {
    const hasRange = nullDisallowed || !util.isNullish(range);
    const col = opType === 'count' ? 'key' : opType; // It doesn't matter which column we use for 'count' as long as it is valid
    const sql = [
        'SELECT', util.sqlQuote(col) + (
            index.multiEntry ? ', ' + util.escapeIndexNameForSQL(index.name) : ''
        ),
        'FROM', util.escapeStoreNameForSQL(index.objectStore.__currentName),
        'WHERE', util.escapeIndexNameForSQL(index.name), 'NOT NULL'
    ];

    /** @type {string[]} */
    const sqlValues = [];
    if (hasRange) {
        if (multiChecks) {
            sql.push('AND (');
            /** @type {import('./Key.js').KeyPathArray} */ (
                range
            ).forEach((innerKey, i) => {
                if (i > 0) { sql.push('OR'); }
                sql.push(util.escapeIndexNameForSQL(index.name), "LIKE ? ESCAPE '^' ");
                sqlValues.push('%' + util.sqlLIKEEscape(
                    /** @type {string} */ (Key.encode(innerKey, index.multiEntry))
                ) + '%');
            });
            sql.push(')');
        } else if (index.multiEntry) {
            sql.push('AND', util.escapeIndexNameForSQL(index.name), "LIKE ? ESCAPE '^'");
            sqlValues.push('%' + util.sqlLIKEEscape(
                /** @type {string} */ (Key.encode(range, index.multiEntry))
            ) + '%');
        } else {
            const convertedRange = convertValueToKeyRange(range, nullDisallowed);
            setSQLForKeyRange(convertedRange, util.escapeIndexNameForSQL(index.name), sql, sqlValues, true, false);
        }
    }
    return [nullDisallowed, index, hasRange, range, opType, multiChecks, sql, sqlValues];
}