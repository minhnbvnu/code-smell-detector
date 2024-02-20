function checkAndUpgradeDb(baseDir, callback) {
  var memoryDbLocation = process.env.STRONGLOOP_MESH_DB ||
    path.join(baseDir, 'strong-pm.json');
  fs.stat(memoryDbLocation, function(err) {
    if (err) return callback();
    upgradeDb(baseDir, memoryDbLocation, false, callback);
  });
}