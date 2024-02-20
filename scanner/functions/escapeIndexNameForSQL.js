function escapeIndexNameForSQL (index) {
    return sqlQuote('I' + escapeNameForSQLiteIdentifier(index));
}