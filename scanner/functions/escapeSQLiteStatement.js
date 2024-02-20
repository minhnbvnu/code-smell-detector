function escapeSQLiteStatement (arg) {
    return escapeUnmatchedSurrogates(arg.replaceAll('^', '^^').replaceAll('\0', '^0'));
}