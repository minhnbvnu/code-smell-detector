async function getConf(rootDir) {
  const profile = await getProfile();

  var confPath = path.join(rootDir, 'faas.yml');
  var isexists = await fs.pathExists(confPath);

  if (!isexists) {
    // try faas.yaml
    confPath = path.join(rootDir, 'faas.yaml');
    isexists = await fs.pathExists(confPath);
  }

  if (!isexists) {
    throw new Error('Current folder not a Faas project\nThe folder must contains faas.yml or faas.yaml');
  }

  const confContent = await fs.readFile(confPath, 'utf8');
  const conf = yaml.safeLoad(confContent);

  if (!conf.accountid) {
    debug('try to get accountId from profile');
    conf.accountid = profile.accountId;
  }

  if (!conf.accessKeyId) {
    debug('try to get accessKeyId from profile');
    conf.accessKeyId = profile.accessKeyId;
  }

  if (!conf.accessKeySecret) {
    debug('try to get accessKeySecret from profile');
    conf.accessKeySecret = profile.accessKeySecret;
  }

  if (!conf.securityToken) {
    debug('try to get securityToken from profile');
    conf.securityToken = profile.securityToken;
  }

  debug('exitst config: %j', conf);
  return conf;
}