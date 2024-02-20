function escapeNameForSQLiteIdentifier (arg) {
    // http://stackoverflow.com/a/6701665/271577
    return '_' + // Prevent empty string
        escapeUnmatchedSurrogates(
            arg.replaceAll('^', '^^') // Escape our escape
                // http://www.sqlite.org/src/tktview?name=57c971fc74
                .replaceAll('\0', '^0')
                // We need to avoid identifiers being treated as duplicates based on SQLite's ASCII-only case-insensitive table and column names
                // (For SQL in general, however, see http://stackoverflow.com/a/17215009/271577
                // See also https://www.sqlite.org/faq.html#q18 re: Unicode (non-ASCII) case-insensitive not working
                .replaceAll(/([A-Z])/gu, '^$1')
        );
}