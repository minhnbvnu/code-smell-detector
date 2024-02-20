function webpackWrap(argv, callback) {
  argv.config = getThemePath();
  argv.port = argv.port || 8000;

  var cwd = process.cwd();

  var pkg = JSON.parse(readFile(join(process.cwd(), 'package.json'), 'utf-8'));

  // don't build main file
  pkg.spm = pkg.spm || {};
  pkg.oldMain = pkg.main;
  pkg.main = '________________';

  generateFile(process.cwd(), pkg);

  getWebpackOpts({cwd:cwd,debug:true,verbose:argv.verbose,pkg:pkg,fromServer:true}, function(err, webpackOpts) {
    var opts = extend(true, {}, webpackOpts, {
      devtool: '#source-map',
      output: {
        library: webpackOpts.pkg.name,
        libraryTarget: 'this',
        path: join(cwd, '_site/dist')
      }
    });
    opts.entry['./bundle'] = join(process.cwd(), './_site/_bundle.js');

    var testOpts = extend(true, {}, webpackOpts, {
      devtool: '#source-map',
      output: {
        path: join(cwd, '_site/dist')
      },
      module: {
        postLoaders: argv.cov ? [{
          test: /\.js$/,
          exclude: /(test|tests|spm_modules|node_modules)\//,
          loader: 'istanbul-instrumenter'
        }] : []
      },
      resolveLoader: {
        modulesDirectories: ['node_modules', join(__dirname, '../node_modules')]
      },
      externals: {
        'sinon': 'sinon'
      }
    });
    testOpts.entry = {
      'test': getSpecFiles(webpackOpts.pkg)
    };

    // Install devDependencies
    // Get deps to install.
    //var query = [];
    //if (pkg && pkg.spm && pkg.spm.devDependencies) {
    //  for (var k in pkg.spm.devDependencies) {
    //    query.push(k+'@'+pkg.spm.devDependencies[k]);
    //  }
    //}
    //
    //install({
    //  name: query,
    //  cwd: cwd,
    //  registry: pkg && pkg.spm && pkg.spm.registry
    //}).then(function() {
    //  buildPackage(opts, argv.watch, function() {
    //    console.log();
    //    buildPackage(testOpts, argv.watch, function() {
    //      console.log();
    //      callback();
    //      copyHtmls();
    //    });
    //  });
    //}, function(err) {
    //  log.error('exit', err.message);
    //  console.log();
    //  process.exit(1);
    //});
    buildPackage(opts, argv.watch, function() {
      console.log();
      buildPackage(testOpts, argv.watch, function() {
        console.log();
        callback();
        copyHtmls();
      });
    });


  });
}