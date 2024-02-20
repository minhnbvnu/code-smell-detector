function _createAuth(dao, accountInfo, next) {
  // create auth
  var accountAuth = dao.modelFactory(
    'account_auth',
    {
      username : credentials.username,
      password : credentials.password,
      type : 'token'
    }, accountInfo);

  dao.create(accountAuth, function(err, modelName, result) {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      _createDomain(dao, accountInfo, next);
    }
  });
}