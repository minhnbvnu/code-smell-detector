function showlog(registry, syncInfo, done) {
  request(
    {
      method: 'GET',
      path: syncInfo.logurl + '?offset=' + syncInfo.lastLines,
    },
    {
      registry,
      configFile: argv.userconfig,
    },
    function (err, info) {
      if (err) {
        return done(err);
      }
      if (!info || !info.log) {
        return setTimeout(showlog.bind(null, registry, syncInfo, done), 2000);
      }
      const log = info.log.trim();
      console.log(log);
      syncInfo.lastLines += log.split('\n').length;
      if (log.indexOf('[done] Sync ' + syncInfo.name) >= 0) {
        done();
      } else {
        setTimeout(showlog.bind(null, registry, syncInfo, done), 2000);
      }
    }
  );
}