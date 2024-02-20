function checkGcloud(cb) {
  exec('gcloud config list --format json', function (err, stdout) {
    if (err) {
      err = new Error('gcloud: not installed (' + err.message + ')');
      cb(FAILED, {what: 'gcloud', error: err});
      return;
    }

    var cfg = {};

    try {
      cfg = JSON.parse(stdout);
    } catch (err) {}

    if (!cfg.core || !cfg.core.account) {
      var errNoConf = new Error('gcloud: not configured');
      cb(FAILED, {what: 'gcloud', data: cfg, error: errNoConf});
      return;
    }

    cb(PASSED, {what: 'gcloud', data: cfg});
  });
}