async function createDBSchema() { 
  try {
    logger.winston.info("------------------------- Starting to create/update DB schema -------------------------");
    await Promise.all([
      db.run("CREATE TABLE  bots (bot_id INTEGER PRIMARY KEY AUTOINCREMENT, bot_name TEXT, bot_config TEXT, output_folder TEXT)", function(error) { sqlOutput(error, "bots"); }),
      db.run("CREATE TABLE  intents (intent_id INTEGER PRIMARY KEY AUTOINCREMENT, intent_name TEXT, bot_id INTEGER)", function(error) { sqlOutput(error, "intents"); }),
      db.run("CREATE TABLE  synonyms (synonym_id INTEGER PRIMARY KEY AUTOINCREMENT, synonym_reference TEXT, regex_pattern TEXT, bot_id INTEGER)", function(error) { sqlOutput(error, "synonyms"); }),
      db.run("CREATE TABLE  entities (entity_id INTEGER PRIMARY KEY AUTOINCREMENT, entity_name TEXT, slot_data_type TEXT, bot_id INTEGER)", function(error) { sqlOutput(error, "entities"); }),
      db.run("CREATE TABLE  expressions (expression_id INTEGER PRIMARY KEY AUTOINCREMENT, expression_text TEXT, intent_id INTEGER)", function(error) { sqlOutput(error, "expressions"); }),
      db.run("CREATE TABLE  expression_parameters (parameter_id INTEGER PRIMARY KEY AUTOINCREMENT, parameter_start INTEGER, parameter_end INTEGER, parameter_value TEXT, expression_id INTEGER, intent_id INTEGER, entity_id INTEGER)", function(error) { sqlOutput(error, "expression_parameters"); }),
      db.run("CREATE TABLE  regex (regex_id INTEGER PRIMARY KEY AUTOINCREMENT, regex_name TEXT, regex_pattern TEXT, bot_id INTEGER)", function(error) { sqlOutput(error, "regex"); }),
      db.run("CREATE TABLE  responses (response_id INTEGER PRIMARY KEY AUTOINCREMENT, response_text TEXT, response_type TEXT, action_id INTEGER)", function(error) { sqlOutput(error, "responses"); }),
      db.run("CREATE TABLE  synonym_variants (synonym_variant_id INTEGER PRIMARY KEY AUTOINCREMENT, synonym_value TEXT, synonym_id INTEGER)", function(error) { sqlOutput(error, "synonym_variants"); }),
      db.run("CREATE TABLE  nlu_log (log_id INTEGER PRIMARY KEY AUTOINCREMENT, ip_address TEXT, query TEXT, event_type TEXT, event_data TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)", function(error) { sqlOutput(error, "nlu_log"); }),
      db.run("CREATE TABLE  models (model_id INTEGER PRIMARY KEY AUTOINCREMENT, model_name TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, comment TEXT, bot_id INTEGER, local_path TEXT, server_path TEXT, server_response TEXT)", function(error) { sqlOutput(error, "models"); }),
      db.run("CREATE TABLE  actions (action_id INTEGER PRIMARY KEY AUTOINCREMENT, action_name TEXT, bot_id INTEGER)", function(error) { sqlOutput(error, "actions"); }),
      db.run("CREATE TABLE  stories (story_id INTEGER PRIMARY KEY AUTOINCREMENT, story_name TEXT, story TEXT, bot_id INTEGER, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)", function(error) { sqlOutput(error, "stories"); }),
      
      db.run("CREATE TABLE  settings (setting_name TEXT, setting_value TEXT)", function(error) {
        sqlOutput(error, "settings");
        db.run("INSERT into settings (setting_name, setting_value) values ('refresh_time', '60000')"); 
      }),

      //New table part of Version 3.0.1
      db.run("CREATE TABLE  conversations (conversation_id INTEGER PRIMARY KEY AUTOINCREMENT, ip_address TEXT, conversation TEXT, story TEXT, bot_id INTEGER, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)", function(error) { sqlOutput(error, "conversations"); }),    

      db.run("CREATE TABLE  version(version)", function(error) { setDBSchemaVersion(error); })
    ]);
  } catch (err) {
    logger.winston.error(err);
  }
}