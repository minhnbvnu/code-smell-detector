function auxServers() {
  var valDefault = sparseConfig.dbMongo.connect + (('testing' === appEnv) ? '_testing' : '');
  var serverSetupMongo = {
    type : 'input',
    name : 'mongoConnectString',
    message : 'Mongo connect string (see http://docs.mongodb.org/manual/reference/connection-string). Default "' + valDefault + '" :'
  };

  prompt(serverSetupMongo, function(answer) {
    if ('' === answer.mongoConnectString) {
      answer.mongoConnectString = valDefault;
    }
    sparseConfig.dbMongo.connect = (/^mongodb:\/\//.test(answer.mongoConnectString) ? '' : 'mongodb://') + answer.mongoConnectString;

    // try connecting
    console.log('trying ' + sparseConfig.dbMongo.connect + ' Ctrl-C to quit');
    GLOBAL.CFG = sparseConfig;
    var Dao = require(__dirname + '/../src/lib/dao');
    var dao = new Dao(sparseConfig,  function(message) {
      writeConfig(function() {
        var bootstrap = require(__dirname + '/../src/bootstrap');
        _createAccount(bootstrap.app.dao, function() {
          process.exit(0);
        });
      });
    });

    dao.on('error', function(err) {
      console.log('MongoDB unconnectable via : ' + sparseConfig.dbMongo.connect);
      console.log(err);
      auxServers();
    });
  });
}