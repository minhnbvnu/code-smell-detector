function GetMigrationFor(dbname, table) {
	var mid = null;
	var db = getDatabase(dbname);
	db.execute('CREATE TABLE IF NOT EXISTS migrations (latest TEXT, model TEXT);');
	var rs = db.execute('SELECT latest FROM migrations where model = ?;', table);
	if (rs.isValidRow()) {
		mid = rs.field(0) + '';
	}
	rs.close();
	return mid;
}