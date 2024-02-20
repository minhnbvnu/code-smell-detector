function triggerBuild() {

  // Pick command lines options that take precedence
  var cmdConfig = _.pick(argv, ['files', 'verbose']);;

  // load config file and merge into config
  var jsonConfig = loadConfig(argv.config || 'magicbook.json');
  _.defaults(cmdConfig, jsonConfig);

  // trigger the build with the new config
  buildFunction(cmdConfig);

  return cmdConfig;

}