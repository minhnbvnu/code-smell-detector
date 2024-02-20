function escapeIndexNameForSQLKeyColumn (index) {
    return 'I' + escapeNameForSQLiteIdentifier(index);
}