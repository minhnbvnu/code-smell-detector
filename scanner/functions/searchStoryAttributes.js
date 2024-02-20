function searchStoryAttributes(req, res, next) {
  logger.winston.info('Stories.searchStoryAttributes');
  var search_string = "%" + req.query.search_text + "%";
  db.all("select * from intents where intent_name like ? and bot_id = ?", [search_string, req.params.bot_id], function(err, intents) {
    if (err) {
      logger.winston.error(err);
    } else {
      db.all("select * from entities where entity_name like ? and bot_id = ?", [search_string, req.params.bot_id], function(err, entities) {
        if (err) {
          logger.winston.error(err);
        } else {
          db.all("select * from actions where action_name like ? and bot_id = ?", [search_string, req.params.bot_id], function(err, actions) {
            if (err) {
              logger.winston.error(err);
            } else {
              var data = [];
              try {
                for (action of actions) {
                  data.push({text: action.action_name, type: "action"});
                }
              } catch (err) {
                logger.winston.error(err);
              }
              try {
                for (entity of entities) {
                  data.push({text: entity.entity_name, type: "entity"});
                }
              } catch (err) {
                logger.winston.error(err);
              }
              try {
                for (intent of intents) {
                  data.push({text: intent.intent_name, type: "intent"});
                }
              } catch (err) {
                logger.winston.error(err);
              }
              res.status(200).json(data);
            }
          });
        }
      });
    }
  });
}