function Mocha(options) {
  options = options || {};
  this.files = [];
  this.options = options;
  if (options.grep) this.grep(new RegExp(options.grep));
  if (options.fgrep) this.grep(options.fgrep);
  this.suite = new exports.Suite('', new exports.Context);
  this.ui(options.ui);
  this.bail(options.bail);
  this.reporter(options.reporter, options.reporterOptions);
  if (null != options.timeout) this.timeout(options.timeout);
  this.useColors(options.useColors);
  if (options.enableTimeouts !== null) this.enableTimeouts(options.enableTimeouts);
  if (options.slow) this.slow(options.slow);

  this.suite.on('pre-require', function (context) {
    exports.afterEach = context.afterEach || context.teardown;
    exports.after = context.after || context.suiteTeardown;
    exports.beforeEach = context.beforeEach || context.setup;
    exports.before = context.before || context.suiteSetup;
    exports.describe = context.describe || context.suite;
    exports.it = context.it || context.test;
    exports.setup = context.setup || context.beforeEach;
    exports.suiteSetup = context.suiteSetup || context.before;
    exports.suiteTeardown = context.suiteTeardown || context.after;
    exports.suite = context.suite || context.describe;
    exports.teardown = context.teardown || context.afterEach;
    exports.test = context.test || context.it;
    exports.run = context.run;
  });
}