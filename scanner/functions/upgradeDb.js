function upgradeDb(memoryDbPath, meshDbPath, callback) {
  var meshOptions = {
    db: {
      connector: SQLite3,
      file: meshDbPath,
    },
  };
  var meshApp = MeshServer(new MeshServiceManager(), null, meshOptions);

  try {
    var data = JSON.parse(fs.readFileSync(memoryDbPath, 'utf8'));
  } catch (err) {
    debug('Source database %s missing or invalid', memoryDbPath);
    return callback(err);
  }
  var models = Object.keys(data.ids);

  meshApp.dataSources.db.autoupdate(function(err) {
    if (err) return callback(err);

    async.each(models, function(modelName, callback) {
      var modelData = data.models[modelName];

      var ModelCtor = meshApp.dataSources.db.models[modelName];
      async.each(Object.keys(modelData), function(id, callback) {
        var data = JSON.parse(modelData[id]);
        var model = new ModelCtor(data);
        model.save(callback);
      }, callback);
    }, callback);
  });
}