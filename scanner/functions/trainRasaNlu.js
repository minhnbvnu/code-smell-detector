function trainRasaNlu(req, res, next) {
  var model = {};
  model.file_path = "server/data/models/" + req.query.bot_name + "/";
  model.file_name = Math.floor(Date.now()) + ".tar.gz";

  logger.winston.info("Rasa NLU Train Request -> " + global.rasa_endpoint + "/model/train");
  try {
    checkDirectoryExists(model.file_path + model.file_name);
    var stream = request({ method: "POST", uri: global.rasa_endpoint + "/model/train", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(req.body) }, function (error, response, body) {
      if (error) {
        logger.winston.error("Error Occured when posting data to nlu endpoint. " + error);
        sendOutput(500, res, '{"error" : ' + error + '}');
        return;
      }
      try {
        if (response.statusCode != 200) {
          logger.winston.error("Error occured while training. Rasa Server Response Code : " + response.statusCode);
          sendOutput(500, res, '{"error" : ' + body + '}');
          return;
        } else {
          model.server_file_name = response.headers["filename"];
          model.response = response;
          logger.winston.info("Training Completed, Rasa Server Response Code : " + response.statusCode);

          sendOutput(200, res, "");

          logs.logRequest(req, 'train', {
            server_response: response.headers["filename"],
            training_data: JSON.stringify(req.body)
          });
        }
      } catch (err) {
        logger.winston.error("Exception:" + err);
        sendOutput(500, res, '{"error" : ' + err + '}');
      }
    }).pipe(fs.createWriteStream(model.file_path + model.file_name));

    stream.on('finish', function () {
      if (model.server_file_name) {
        db.run('insert into models(model_name, comment, bot_id, local_path, server_path, server_response)' + 'values (?,?,?,?,?,?)', [model.file_name, req.query.comment, req.query.bot_id, model.file_path + model.file_name, model.server_file_name, "response"], function (err) {
          if (err) {
            logger.winston.error("Error inserting a new record: " + err);
          } else {
            logger.winston.info("Model saved to models table");
          }
        });
      }
    });
  } catch (err) {
    logger.winston.error("Exception When sending Training Data to Rasa:" + err);
  }
}