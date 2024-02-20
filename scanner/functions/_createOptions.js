function _createOptions(dao, domainId, accountInfo, next) {
  // create auth
  var accountOptions = dao.modelFactory(
    'account_option',
    {
      bip_type : 'http',
      bip_domain_id : domainId,
      bip_end_life : {
        imp : 0,
        time : 0
      },
      bip_expire_behaviour: 'pause',
      timezone : sparseConfig.timezone
    }, accountInfo);

  dao.create(accountOptions, function(err, modelName, result) {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      next();
    }
  });
}