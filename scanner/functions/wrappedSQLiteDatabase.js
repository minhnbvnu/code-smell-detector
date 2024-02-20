function wrappedSQLiteDatabase (name) {
    const db = new SQLiteDatabase(name, {});
    if (CFG.sqlBusyTimeout) {
        db._db.configure('busyTimeout', /** @type {number} */ (CFG.sqlBusyTimeout)); // Default is 1000
    }
    if (CFG.sqlTrace) {
        // @ts-expect-error native API?
        db._db.configure('trace', CFG.sqlTrace);
    }
    if (CFG.sqlProfile) {
        // @ts-expect-error native API?
        db._db.configure('profile', CFG.sqlProfile);
    }
    return db;
}