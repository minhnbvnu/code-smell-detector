function runParent() {
  const argv = require('yargs')
    .usage('Usage: $0 [directory] [options]')
    .option('overwrite', {
      describe: 'Overwrite original files with transpile output.',
      type: 'boolean',
    })
    .help('help').argv;

  const assert = require('assert');
  const child_process = require('child_process');
  const fs = require('fs');
  const os = require('os');
  const path = require('path');

  const pathRules = require('../lib/path-rules');

  const developmentFilePath = path.join(__dirname, '../../../DEVELOPMENT');

  const cpus = os.cpus();
  const numWorkers = cpus ? Math.max(cpus.length - 1, 1) : 1;

  const count = {
    skipped: 0,
    transpiled: 0,
  };

  const directory = argv._[0] && path.resolve(argv._[0]);
  const jsFiles = pathRules.getIncludedFiles(directory);

  // Sanity checks
  jsFiles.forEach(filename => {
    assert(path.isAbsolute(filename));
  });

  console.log('%s workers. %s files...', numWorkers, jsFiles.length);

  const ProgressBar = require('progress');
  const progressBar = new ProgressBar(
    'transpiling [:bar] (:current/:total) :etas',
    {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: jsFiles.length,
    },
  );

  for (let i = 0; i < numWorkers; i++) {
    child_process
      .fork(__filename)
      .on('message', function(m) {
        if (m.transpiled === true) {
          count.transpiled++;
          progressBar.tick();
        } else if (m.skipped === true) {
          count.skipped++;
          progressBar.tick();
        }
        if (jsFiles.length) {
          this.send({cmd: 'next', filename: jsFiles.pop()});
        } else {
          this.kill();
        }
      })
      .on('exit', code => {
        if (code) {
          process.exit(code);
        }
      })
      .send({cmd: 'init', overwrite: argv.overwrite});
  }

  process.once('exit', code => {
    if (code !== 0) {
      return;
    }
    if (argv.overwrite && !directory && fs.existsSync(developmentFilePath)) {
      fs.unlinkSync(developmentFilePath);
    }
    console.log(
      'transpiled: %s | skipped: %s | %ds',
      count.transpiled,
      count.skipped,
      process.uptime().toFixed(2),
    );
  });
}