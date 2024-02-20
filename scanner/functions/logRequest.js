function logRequest(req, type, data) {
  try {
    const obj = {};
    obj.ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    obj.query = req.originalUrl;
    obj.event_type = type;
    obj.event_data = JSON.stringify(data);
    
    db.run('insert into nlu_log (ip_address, query, event_type, event_data)' + 'values (?,?,?,?)', [obj.ip_address, obj.query, obj.event_type, obj.event_data], function(err) {
      if (err) {
        logger.winston.error("Error inserting a new record");
      }
    });
  } catch (err) {
    logger.winston.info('Error: ' + err);
  }
}