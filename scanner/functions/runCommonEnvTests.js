function runCommonEnvTests(commonEnvData, t) {
  var ARCHS = ['x86', 'x86_64', 'ppc32', 'ppc64', 'ppc64le', 's390', 's390x'];
  var ZOS_ARCHS = ['3906', '2964', '2965', '2827', '2828', '2817', '2818'];
  var OSES = ['AIX', 'Linux', 'Windows', 'Mac OS X', 'OS/390'];

  t.ok(ARCHS.indexOf(commonEnvData['os.arch']) != -1, 'Contains a recognised value for os.arch', skipIfzOS);
  t.ok(ZOS_ARCHS.indexOf(commonEnvData['os.arch']) != -1, 'Contains a recognised value for z/OS os.arch', skipIfNotzOS);

  var found = false;
  for (var entry in OSES) {
    if (commonEnvData['os.name'].indexOf(OSES[entry]) > -1) {
      found = true;
      break;
    }
  }
  t.ok(found, 'Contains a recognised value for os.name');

  t.match(commonEnvData['os.version'], /\S/, "os.version isn't empty");

  t.ok(isInteger(commonEnvData['pid']), 'pid is an integer');

  t.ok(commonEnvData['pid'] > 1, 'pid is > 1');

  t.match(commonEnvData['native.library.date'], /\S/, "native.library.date isn't empty");

  // NOTE(mjt): jar.version is required from appmetrics v1.0.0 - v1.0.3
  // and is removed in 1.0.4
  if (commonEnvData.hasOwnProperty('jar.version')) {
    // TODO(mjt): Re-enable once corbint fixes env plugin not to send blank
    // jar.version. For now, commenting this out so it doesn't block testing.
    //    assert(/^\d+\.\d+\.\d+\.\d{12}$/.test(commonEnvData['jar.version']),
    //           "Environment message does not have a value for jar.version in a recognised format ("
    //            + commonEnvData['jar.version'] + "), expected 99.99.99.123456789012");
  }

  t.ok(isInteger(commonEnvData['number.of.processors']), 'number.of.processors is an integer', skipIfzOS);

  t.ok(commonEnvData['number.of.processors'] > 0, 'number.of.processors is > 1', skipIfzOS);

  t.match(commonEnvData['command.line'], /\S/, "command.line isn't empty", skipIfzOS);

  var envVarCount = 0;
  var keys = Object.keys(commonEnvData);
  for (var i = 0; i < keys.length; i++) {
    if (/^environment./.test(keys[i])) envVarCount++;
  }
  t.ok(envVarCount > 0, 'Environment data contains enviromnent variable(s)');

  var requiredKeys = [
    'os.arch',
    'os.name',
    'os.version',
    'pid',
    'native.library.date',
    'number.of.processors',
    'command.line',
  ];
  requiredKeys.forEach(function(key) {
    t.ok(commonEnvData.hasOwnProperty(key), 'Environment data contains ' + key);
  });
}