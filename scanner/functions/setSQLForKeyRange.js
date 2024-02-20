function setSQLForKeyRange (
    range, quotedKeyColumnName, sql, sqlValues, addAnd, checkCached
) {
    if (range && (range.lower !== undefined || range.upper !== undefined)) {
        if (addAnd) { sql.push('AND'); }
        let encodedLowerKey, encodedUpperKey;
        const hasLower = range.lower !== undefined;
        const hasUpper = range.upper !== undefined;
        if (hasLower) {
            encodedLowerKey = checkCached ? range.__lowerCached : Key.encode(range.lower);
        }
        if (hasUpper) {
            encodedUpperKey = checkCached ? range.__upperCached : Key.encode(range.upper);
        }
        if (hasLower) {
            sqlValues.push(util.escapeSQLiteStatement(/** @type {string} */ (encodedLowerKey)));
            if (hasUpper && encodedLowerKey === encodedUpperKey && !range.lowerOpen && !range.upperOpen) {
                sql.push(quotedKeyColumnName, '=', '?');
                return;
            }
            sql.push(quotedKeyColumnName, (range.lowerOpen ? '>' : '>='), '?');
        }
        if (hasLower && hasUpper) { sql.push('AND'); }
        if (hasUpper) {
            sql.push(quotedKeyColumnName, (range.upperOpen ? '<' : '<='), '?');
            sqlValues.push(util.escapeSQLiteStatement(/** @type {string} */ (encodedUpperKey)));
        }
    }
}