function testModule(moduleName, option) {
  var karma = require('karma').server;
  var Q = require('q');
  var dynamicconf = require("./test/conf/karma.dynamic.conf");
  dynamicconf.extrasModule = moduleName;
//  dynamicconf.uiRouter = "0.2.8";

  var d = Q.defer();
  var extraOptions, karmaConfig = { configFile: __dirname + '/test/conf/karma.any.conf.js' };
  switch(option) {
    case "debug":
      extraOptions = { singleRun: false, browsers: ["Chrome"] };
      break;
    case "watch":
      extraOptions = { singleRun: false, browsers: ["PhantomJS"] };
      break;
    default:
      extraOptions = { singleRun: true, browsers: ["PhantomJS"] };
  }

  karma.start(_.extend(karmaConfig, extraOptions), done);

  function done(success) {
    if (success === 0) {
      d.resolve();
    } else {
      d.reject();
    }
  }
  return d.promise;
}