function escapeDatabaseNameForSQLAndFiles (db) {
    if (CFG.escapeDatabaseName) {
        // We at least ensure NUL is escaped by default, but we need to still
        //   handle empty string and possibly also length (potentially
        //   throwing if too long), escaping casing (including Unicode?),
        //   and escaping special characters depending on file system
        return CFG.escapeDatabaseName(escapeSQLiteStatement(db));
    }
    db = 'D' + escapeNameForSQLiteIdentifier(db);
    if (CFG.escapeNFDForDatabaseNames !== false) {
        // ES6 copying of regex with different flags
        db = db.replaceAll(new RegExp(expandsOnNFD, 'gu'), function (expandable) {
            return '^4' + /** @type {Integer} */ (expandable.codePointAt(0)).toString(16).padStart(6, '0');
        });
    }
    if (CFG.databaseCharacterEscapeList !== false) {
        db = db.replace(
            (CFG.databaseCharacterEscapeList
                ? new RegExp(CFG.databaseCharacterEscapeList, 'gu')
                : /[\u0000-\u001F\u007F"*/:<>?\\|]/gu), // eslint-disable-line no-control-regex
            function (n0) {
                // eslint-disable-next-line unicorn/prefer-code-point -- Switch to `codePointAt`?
                return '^1' + n0.charCodeAt(0).toString(16).padStart(2, '0');
            }
        );
    }
    if (CFG.databaseNameLengthLimit !== false &&
        db.length >= ((CFG.databaseNameLengthLimit || 254) - (CFG.addSQLiteExtension !== false ? 7 /* '.sqlite'.length */ : 0))) {
        throw new Error(
            'Unexpectedly long database name supplied; length limit required for Node compatibility; passed length: ' +
            db.length + '; length limit setting: ' + (CFG.databaseNameLengthLimit || 254) + '.'
        );
    }
    return db + (CFG.addSQLiteExtension !== false ? '.sqlite' : ''); // Shouldn't have quoting (do we even need NUL/case escaping here?)
}