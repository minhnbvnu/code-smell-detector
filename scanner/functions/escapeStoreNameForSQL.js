function escapeStoreNameForSQL (store) {
    return sqlQuote('S' + escapeNameForSQLiteIdentifier(store));
}