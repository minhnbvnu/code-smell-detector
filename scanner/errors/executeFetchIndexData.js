function executeFetchIndexData (
    tx.executeSql(sql.join(' '), sqlValues, function (tx, data) {
        const records = [];
        let recordCount = 0;
        const decode = isCount
            ? () => { /* */ }
            : (opType === 'key'
                // eslint-disable-next-line @stylistic/operator-linebreak -- JSDoc
                ?
                /**
                 * @param {{
                 *   key: string
                 * }} record
                 * @returns {import('./Key.js').ValueType|undefined}
                 */
                (record) => {
                    // Key.convertValueToKey(record.key); // Already validated before storage
                    return Key.decode(util.unescapeSQLiteResponse(record.key));
                }
                // eslint-disable-next-line @stylistic/operator-linebreak -- JSDoc
                :
                /**
                 * @param {{
                 *   value: string
                 * }} record
                 * @returns {AnyValue}
                 */
                (record) => { // when opType is value
                    return Sca.decode(util.unescapeSQLiteResponse(record.value));
                });
        if (index.multiEntry) {
            const escapedIndexNameForKeyCol = util.escapeIndexNameForSQLKeyColumn(index.name);
            const encodedKey = Key.encode(range, index.multiEntry);
            for (let i = 0; i < data.rows.length; i++) {
                const row = data.rows.item(i);
                const rowKey = /** @type {import('./Key.js').ValueTypeArray} */ (
                    Key.decode(row[escapedIndexNameForKeyCol])
                );
                let record;
                if (hasKey && (
                    (multiChecks && range.some(
                        /**
                         * @param {string} check
                         * @returns {boolean}
                         */
                        (check) => rowKey.includes(check)
                    )) || // More precise than our SQL
                    Key.isMultiEntryMatch(
                        /** @type {string} */
                        (encodedKey),
                        row[escapedIndexNameForKeyCol]
                    )
                )) {
                    recordCount++;
                    record = row;
                } else if (!hasKey && !multiChecks) {
                    if (rowKey !== undefined) {
                        recordCount += (Array.isArray(rowKey) ? rowKey.length : 1);
                        record = row;
                    }
                }
                if (record) {
                    records.push(decode(record));
                    if (unboundedDisallowed) {
                        break;
                    }
                }
            }
        } else {
            for (let i = 0; i < data.rows.length; i++) {
                const record = data.rows.item(i);
                if (record) {
                    records.push(decode(record));
                }
            }
            recordCount = records.length;
        }
        if (isCount) {
            success(recordCount);
        } else if (recordCount === 0) {
            success(unboundedDisallowed ? undefined : []);
        } else {
            success(unboundedDisallowed ? records[0] : records);
        }
    }, /** @type {SQLStatementErrorCallback} */ (error));