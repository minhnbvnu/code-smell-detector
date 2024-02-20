function restAuthWrapper(req, res, next) {
  if (!req.header('authorization') && req.session.account && req.session.account.host === getClientInfo(req).host && !req.masqUser) {
    app.modules.auth.getAccountStruct(req.session.account, function(err, accountInfo) {
      if (!err) {
        req.remoteUser = req.user = accountInfo;
        next();
      } else {
        res.status(401).end();
      }
    });
  } else {
    return connect.basicAuth(function(user, pass, next) {
      app.modules.auth.test(user, pass, { masquerade : req.masqUser }, next);
    })(req, res, next);
  }
}