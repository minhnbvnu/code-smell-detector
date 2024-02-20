async function getProfileFromFile() {
  const profPath = path.join(process.env.HOME || os.homedir(), '.fcli/config.yaml');
  const isExists = await fs.pathExists(profPath);

  var profile = {};

  if (!isExists) {
    return profile;
  }

  const profContent = await fs.readFile(profPath, 'utf8');
  const profYml = yaml.safeLoad(profContent);

  if (profYml.endpoint) {
    profile.accountId = extractAccountId(profYml.endpoint);
    profile.defaultRegion = extractRegion(profYml.endpoint);
    profile.protocol = extractProtocol(profYml.endpoint);
  }

  if (profYml.access_key_id) {
    profile.accessKeyId = profYml.access_key_id;
  }

  if (profYml.access_key_secret) {
    profile.accessKeySecret = profYml.access_key_secret;
  }

  if (profYml.report !== undefined) {
    profile.report = profYml.report;
  }

  if (profYml.enable_custom_endpoint !== undefined) {
    profile.enableCustomEndpoint = profYml.enable_custom_endpoint;
  }

  profile.timeout = profYml.timeout || 10;
  profile.retries = profYml.retries || 3;
  profile.endpoint = profYml.endpoint;

  return profile;
}