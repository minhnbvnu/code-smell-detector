function _createAccount(dao, next) {


  // check for an existing account
  dao.findFilter('account', { username : credentials.username}, function(err, result) {
    if (err) {
      console.error(err);
      process.exit(1);
    } else if (result && result.length) {
      console.info("USER '" + credentials.username + "' ALREADY EXISTS, SKIPPING USER SETUP");
      process.exit(0);
    } else {
      var account = dao.modelFactory(
        'account',
        {
          name : credentials.username,
          username : credentials.username,
          account_level : GLOBAL.DEFS.ACCOUNT_LEVEL.ADMIN,
          email_account : credentials.email
        });

      dao.create(account, function(err, modelName, result) {
        if (err) {
          console.error(err);
          process.exit(1);
        } else {
          _createAuth(
            dao,
            {
              user : {
                id : result.id
              },
              getId : (function(id) {
                return function() {
                  return id
                }
              })(result.id)
            },
            next);
        }
      });
    }
  });
}