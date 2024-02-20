function getMissionControlConfiguration(redSettings) {
  if (_mcSettings != null) {
    return _mcSettings;
  }

  const mcSettings = redSettings.RedBot || {};

  // get current version
  const jsonPackage = fs.readFileSync(__dirname + '/../package.json');
  let packageJson;
  try {
    packageJson = JSON.parse(jsonPackage.toString());
  } catch(e) {
    lcd.error('Unable to open node-red-contrib-chatbot/package.json');
  }
  // front end evironment
  mcSettings.version = packageJson.version;

  let frontendEnvironment = 'production';
  if (process.env.REDBOT_DEVELOPMENT_MODE != null && (
    process.env.REDBOT_DEVELOPMENT_MODE.toLowerCase() === 'true' ||
    process.env.REDBOT_DEVELOPMENT_MODE.toLowerCase() === 'dev' ||
    process.env.REDBOT_DEVELOPMENT_MODE.toLowerCase() === 'development'
  )) {
    frontendEnvironment = 'development';
  } else if (process.env.REDBOT_DEVELOPMENT_MODE != null && process.env.REDBOT_DEVELOPMENT_MODE.toLowerCase() === 'plugin') {
    frontendEnvironment = 'plugin';
  }
  mcSettings.frontendEnvironment = frontendEnvironment;

  mcSettings.salt = !_.isEmpty(redSettings.credentialSecret) ? redSettings.credentialSecret : 'redbot-salt';

  if (!_.isEmpty(process.env.REDBOT_DB_PATH)) {
    mcSettings.dbPath = path.join(process.env.REDBOT_DB_PATH, 'mission-control.sqlite');
    mcSettings.dbQueuePath = path.join(process.env.REDBOT_DB_PATH, 'queues.sqlite');
  } else if (mcSettings.dbPath == null) {
    mcSettings.dbPath = path.join(redSettings.userDir, 'mission-control.sqlite');
    mcSettings.dbQueuePath = path.join(redSettings.userDir, 'queues.sqlite');
  } else {
    mcSettings.dbPath = mcSettings.dbPath.replace(/\/$/, '') + '/mission-control.sqlite';
    mcSettings.dbQueuePath = mcSettings.dbPath.replace(/\/$/, '') + '/queues.sqlite';
  }

  if (mcSettings.pluginsPath == null && !fs.existsSync(mcSettings.pluginsPath)) {
    mcSettings.pluginsPath = path.join(redSettings.userDir, 'dist-plugins');
  }
  if (!fs.existsSync(mcSettings.pluginsPath)) {
    // try to create it
    try {
      fs.mkdirSync(mcSettings.pluginsPath);
    } catch(e) {
      console.log(lcd.timestamp() + '  ' + lcd.orange(`Unable to create plugins dir: ${mcSettings.pluginsPath}`));
    }
  }

  // get root
  if (mcSettings.root == null) {
    mcSettings.root = '/mc';
  } else {
    mcSettings.root = mcSettings.root.replace(/\/$/, '');
  }
  if (!_.isEmpty(redSettings.httpAdminRoot)) {
    mcSettings.root = redSettings.httpAdminRoot.replace(/\/$/, '') + mcSettings.root;
  }

  // get host
  if (mcSettings.host == null) {
    mcSettings.host = 'localhost';
  }

  // get port
  mcSettings.port = redSettings.uiPort;

  _mcSettings = mcSettings;
  return mcSettings;
}