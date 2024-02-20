function generateDb(options, callback) {

  if (pDbUpdatingQueue.push(callback) > 1)
    return;

  var progressBar = options.progressBar;
  if (progressBar) {
    // Preventing ProgressBar terminates before finish downloading all files,
    // in case that one db file finishes downloading before all others establish
    // connections to the servers.
    progressBar.total = kRegionalDelegationFiles.length;
  }

  function handleDownloadStream(stream, callback) {
    if (progressBar) {
      progressBar.total += stream.length - 1;
      progressBar.tick(0);
    }
    var bufs = [];
    stream.on('data', function(chunk) {
      if (progressBar)
        progressBar.tick(chunk.length);
      bufs.push(chunk);
    });
    stream.on('error', function(err) {
      callback(err);
    });
    stream.on('end', function() {
      callback(null, bufs);
    });
    stream.resume();
  }

  async.map(kRegionalDelegationFiles, function(file, callback) {
    async.waterfall([
      downloadFile.bind(null, file.url),
      handleDownloadStream,
      processRegionalDelegationFile
    ], callback);
  }, function(err, regionalDbs) {
    if (!err) {
      var unsortedDb = {};
      regionalDbs.forEach(function(regionalDb) {
        for (var country in regionalDb) {
          if (!unsortedDb[country])
            unsortedDb[country] = [];
          [].push.apply(unsortedDb[country], regionalDb[country]);
        }
      });
      var sortedDb = {};
      Object.keys(unsortedDb).sort().forEach(function(country) {
        sortedDb[country] = unsortedDb[country].sort(Prefix.comparator);
      });
      pDelegationDb = DelegationDb.parse({
        byCountry: sortedDb,
        lastUpdate: Date.now()
      });
      // output as readable JSON file, making it diff friendly.
      fs.writeFileSync(kDelegationDbPath, pDelegationDb.toJSON());
    }
    while (pDbUpdatingQueue.length > 0)
      pDbUpdatingQueue.shift()(err);
  });

}