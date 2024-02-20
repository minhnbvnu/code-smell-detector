function _createDomain(dao, accountInfo, next) {
  // create auth
  var domain = dao.modelFactory(
    'domain',
    {
      name : (credentials.username + '.' + sparseConfig.domain_public).replace(/:.*$/, ''),
      type : 'custom',
      _available : true
    }, accountInfo);

  dao.create(domain, function(err, modelName, result) {
    // skip name lookup errors
    if (err && err.code !== 'ENOTFOUND') {
      console.error(err);
      process.exit(1);
    } else {
      // upgrade to vanity
      dao.updateColumn('domain', { id : result.id}, { type : 'vanity'});

      // pseudo accountInfo structure
      accountInfo.user.domains = {
        test : function() {
          return true
        }
      };
      _createOptions(dao, result.id, accountInfo, next);
    }
  });
}