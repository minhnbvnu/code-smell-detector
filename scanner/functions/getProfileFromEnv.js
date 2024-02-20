async function getProfileFromEnv() {
  const profile = await getProfileFromFile();

  if (process.env.ACCOUNT_ID) {
    debug('try to get ACCOUNT_ID from environment variable');
    profile.accountId = process.env.ACCOUNT_ID;
  }

  if (process.env.DEFAULT_REGION) {
    debug('try to get DEFAULT_REGION from environment variable');
    profile.defaultRegion = process.env.DEFAULT_REGION;
  }

  if (process.env.REGION) {
    debug('try to get REGION from environment variable');
    profile.defaultRegion = process.env.REGION;
  }

  if (process.env.ACCESS_KEY_ID) {
    debug('try to get ACCESS_KEY_ID from environment variable');
    profile.accessKeyId = process.env.ACCESS_KEY_ID;
  }

  if (process.env.ACCESS_KEY_SECRET) {
    debug('try to get ACCESS_KEY_SECRET from environment variable');
    profile.accessKeySecret = process.env.ACCESS_KEY_SECRET;
  }

  if (process.env.SECURITY_TOKEN) {
    debug('try to get SECURITY_TOKEN from environment variable');
    profile.securityToken = process.env.SECURITY_TOKEN;
  }

  if (process.env.TIMEOUT) {
    debug('try to get TIMEOUT from environment variable');
    profile.timeout = process.env.TIMEOUT;
  }

  if (process.env.RETRIES) {
    debug('try to get RETRIES from environment variable');
    profile.retries = process.env.RETRIES;
  }

  if (process.env.FC_ENDPOINT) {
    debug('try to get ENDPOINT from environment variable');
    profile.fcEndpoint = process.env.FC_ENDPOINT;
  }

  if (process.env.ENABLE_CUSTOM_ENDPOINT) {
    debug('try to get ENABLE_CUSTOM_ENDPOINT from environment variable');
    profile.enableCustomEndpoint = process.env.ENABLE_CUSTOM_ENDPOINT;
  }

  return profile;
}