function sqlOutput(error, table_name) {
  if (!error) {
    logger.winston.info("Table: " + table_name + " created");
  }
}