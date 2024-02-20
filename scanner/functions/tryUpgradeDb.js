function tryUpgradeDb(baseDir, memoryDbPath, dryRun, callback) {
  var meshDbPath = path.join(baseDir, 'strong-mesh.db');
  fs.stat(meshDbPath, function(err) {
    debug('Ensuring %s doesn\'t exist', meshDbPath);
    if (!err) {
      debug('Error: %s exist', meshDbPath);
      return callback(new Error('Database ' + meshDbPath + ' already exists'));
    }

    upgradeDb(memoryDbPath, meshDbPath, function(err) {
      if (err) {
        debug('Upgrade failed Removing db: %s', meshDbPath);
        return fs.unlink(meshDbPath, function(uerr) {
          if (uerr) {
            debug('Unable to remove database', uerr);
          }
          callback(err);
        });
      }
      if (dryRun) {
        debug('Cleaning out %s (dry-run).', meshDbPath);
        return fs.unlink(meshDbPath, callback);
      } else {
        debug('Cleaning out %s.', memoryDbPath);
        return fs.unlink(memoryDbPath, callback);
      }
    });
  });
}