function rawBodyParser(req, res, next) {
  var contentType = req.headers['content-type'] || '',
    mime = contentType.split(';')[0];

  req.rawBody = '';
  req.on('data', function(chunk) {
    var buf = req.rawBody + chunk;
    // don't buffer payloads which are too large
    if (buf.length <= 1024 * 1024) {
      req.rawBody = buf;
    }
  });

  req.on('end', function() {
    if (req.body && req.body.body && !app.helper.isObject(req.body.body)) {
      try {
        req.body.body = JSON.parse(req.body.body);
      } catch (e) {

      }
    }

    if ( (!req.body || (app.helper.isObject(req.body) && !Object.keys(req.body).length ))  && req.rawBody) {
     try {
        req.body = JSON.parse(req.rawBody);
      } catch (e) {

      }
    }
  });

  next();
}