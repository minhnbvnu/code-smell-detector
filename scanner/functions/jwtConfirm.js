function jwtConfirm(req, res, next) {
  var masq = req.header('x-user-delegate'),
    token = req.header('x-jwt-signature'),
    structedMethods = [ 'POST', 'PUT', 'PATCH'],
    payload = {};

  if (token) {
    if (structedMethods.indexOf(req.method)) {
      payload = req.body;
    }

    try {
      jwt.verify(token, GLOBAL.CFG.jwtKey, function(err, decoded) {
        var remoteHost = req.header('X-Forwarded-For') || req.connection.remoteAddress;
        if (err) {
          app.logmessage(err.message + ' (IP ' + remoteHost + ')');
          _jwtDeny(res, err.message);
        } else {
          try {
            if (decoded.path === req.originalUrl) {
              // && JSON.stringify(decoded.body) === JSON.stringify(req.body)) {

              if (decoded.user === masq) {
                req.masqUser = masq;
              }

              next();
            } else {
              _jwtDeny(res);
            }
          } catch (e) {
            app.logmessage(e.message, 'error');
            _jwtDeny(res, e.message);
          }
        }
      });
    } catch (e) {
      // jsonwebtoken doesn't catch parse errors by itself.
      app.logmessage(e.message, 'error');
      _jwtDeny(res, e.message);
    }

  } else {
    next();
  }
}