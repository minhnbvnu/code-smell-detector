function accountQuery(accountId, username) {
  dao.find(
    modelName,
    {
      owner_id : accountId,
      type : 'token'
    },
    function(err, result) {
      if (err || !result) {
        console.log(err);
        if (!result) {
          console.log('account id not found');
        }
        process.exit(0);
      } else {
        if (username) {
          console.log('Username : ' + username)
        }
        console.log('Token : ' + dao.modelFactory(modelName, result).getPassword());
        process.exit(0);
      }
    }
  );
}