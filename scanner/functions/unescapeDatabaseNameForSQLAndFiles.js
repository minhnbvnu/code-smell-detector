function unescapeDatabaseNameForSQLAndFiles (db) {
    if (CFG.unescapeDatabaseName) {
        // We at least ensure NUL is unescaped by default, but we need to still
        //   handle empty string and possibly also length (potentially
        //   throwing if too long), unescaping casing (including Unicode?),
        //   and unescaping special characters depending on file system
        return CFG.unescapeDatabaseName(unescapeSQLiteResponse(db));
    }

    return unescapeUnmatchedSurrogates(
        db.slice(2) // D_
            // CFG.databaseCharacterEscapeList
            .replaceAll(/(\^+)1([0-9a-f]{2})/gu, (_, esc, hex) => {
                return esc.length % 2
                    ? esc.slice(1) + String.fromCodePoint(Number.parseInt(hex, 16))
                    : _;
            // CFG.escapeNFDForDatabaseNames
            }).replaceAll(/(\^+)4([0-9a-f]{6})/gu, (_, esc, hex) => {
                return esc.length % 2
                    ? esc.slice(1) + String.fromCodePoint(Number.parseInt(hex, 16))
                    : _;
            })
    // escapeNameForSQLiteIdentifier (including unescapeUnmatchedSurrogates() above)
    ).replaceAll(/(\^+)([A-Z])/gu, (_, esc, upperCase) => {
        return esc.length % 2
            ? esc.slice(1) + upperCase
            : _;
    }).replaceAll(/(\^+)0/gu, (_, esc) => {
        return esc.length % 2
            ? esc.slice(1) + '\0'
            : _;
    }).replaceAll('^^', '^');
}