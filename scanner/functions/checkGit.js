function checkGit(cb) {
  exec('git config --list', function (err, stdout) {
    if (err) {
      err = new Error('git: not installed (' + err.message + ')');
      cb(FAILED, {what: 'git', error: err});
      return;
    }

    var data = iniparser.parseString(stdout);

    if (!data['user.name'] || !data['user.email']) {
      var errNoConf = new Error('git: not configured');
      cb(FAILED, {what: 'git', data: data, error: errNoConf});
      return;
    }

    cb(PASSED, {what: 'git', data: data});
  });
}