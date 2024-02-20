function setDBSchemaVersion(error) {
  if (error) {
    db.run("UPDATE version set version = ?", global.db_schema);
    logger.winston.info("Database Schema updated to v" + global.db_schema + " "); 
  } else {
    db.run("INSERT into version (version) values (?)", global.db_schema);
    logger.winston.info("Database Schema v" + global.db_schema + " created"); 
  }
}