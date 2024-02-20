function runGenerator(answers, opts, cb) {
  answers = answers || {};
  answers.siteName = answers.siteName || 'Test site';
  answers.siteDescription = answers.siteDescription || 'Dummy desc';
  answers.siteUrl = answers.siteUrl || 'http://test.example.org';
  answers.layoutChoice = answers.layoutChoice || 'default';

  if (typeof opts === 'function') {
    cb = opts;
    opts = null;
  }

  opts = opts || {
    'skip-install': true,
    quiet: true
  };

  helpers.run(path.join(__dirname, '../app'))
    .inDir(path.join(__dirname, 'tmp'))
    .withOptions(opts)
    .withPrompt(answers)
    .on('end', function () {
      nock.cleanAll();
      nock.enableNetConnect();
      cb();
    });
}