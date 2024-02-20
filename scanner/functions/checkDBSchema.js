function checkDBSchema() {
  //Get version of DB Schema from version table, if != to version, suggest upgrade
  db.all("SELECT * from version", function(err, rows) {
    if (err && err.errno == 1) {
      createDBSchema();
    } else {
      if (rows.length > 0 && rows[0].version == global.db_schema) {
        logger.winston.info("Schema version v" + rows[0].version + " matches package.json schema version v" + global.db_schema); 
      } else {
        var current_version = "?";
        if (rows.length > 0) {
          current_version = rows[0].version;
        }
        logger.winston.warn("Schema version v" + current_version + " DOES NOT match package.json schema version v" + global.db_schema);
        if (global.db_autoupdate == "true") {
          createDBSchema();
        } else {
          logger.winston.error("Please upgrade your schema");
        }
      }
    }
  });
}