function bipAuthWrapper(req, res, cb) {
  app.modules.auth.domainAuth(helper.getDomain(req.headers.host, true), function(err, acctResult) {
    if (err) {
      // reject always
      bipBasicFail(req, res);
    } else {
      filter = {
        'name' : req.params.bip_name,
        'type' : 'http',
        'paused' : false,
        'domain_id' : acctResult.getActiveDomain().id
      };

      dao.find('bip', filter, function(err, result) {
        if (!err && result) {
          if (result.config.auth == 'none') {
            req.remoteUser = acctResult;

            cb(false, true);

          } else {
            connect.basicAuth(function(username, password, next) {
              if ('basic' === result.config.auth) {
                var authed = result.config.username
                  && result.config.username == username
                  && result.config.password
                  && result.config.password == password;

                if (authed) {
                  app.modules.auth.test(result.owner_id, password, { acctBind : true, asOwner : true, masquerade : req.masqUser }, next);
                } else {
                  bipBasicFail(req, res);
                }

              } else if ('token' === result.config.auth) {
                app.modules.auth.test(username, password, { masquerade : req.masqUser }, next);
              } else {
                bipBasicFail(req, res);
              }
            })(req, res, cb);
          }
        } else {
          bipBasicFail(req, res);
        }
      });
    }
  });
}