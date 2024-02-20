function getBotActionsAndResponses(req, res, next) {
  logger.winston.info('actions.getBotActionsAndResponses');
  db.all('select * from actions where bot_id = ? order by action_id desc', req.query.bot_id, function(err, actions) {
    if (err) {
      logger.winston.error(err);
    } else {
      var actionIds = [];
      for (var i = 0; i < actions.length; i++) {
        actionIds.push(actions[i].action_id);
      }
      if (actionIds.length > 0) {
        db.all('select * from responses where action_id in (' + actionIds.splice(",") + ')  order by action_id desc', function(err, responses) {
          if (err) {
            logger.winston.error(err);
          } else {
            res.status(200).json([{actions: actions, responses: responses}]);
          }
        });
      } else {
        res.status(200).json([{actions: actions, responses: []}]);
      }
    }
  });
}