async function getProfileFromDotEnv() {
  const profile = await getProfileFromEnv();

  if (dotenv) {
    if (dotenv.error) {
      debug('could not found .env file, so ignore'); // dotenv file may not exist.
      return profile;
    }

    const parsed = dotenv.parsed;

    if (parsed['ACCOUNT_ID']) {
      debug('try to get ACCOUNT_ID from dotenv variable');
      profile.accountId = parsed['ACCOUNT_ID'];
    }

    if (parsed['DEFAULT_REGION']) {
      debug('try to get DEFAULT_REGION from dotenv variable');
      profile.defaultRegion = parsed['DEFAULT_REGION'];
    }

    if (parsed['REGION']) {
      debug('try to get REGION from dotenv variable');
      profile.defaultRegion = parsed['REGION'];
    }

    if (parsed['ACCESS_KEY_ID']) {
      debug('try to get ACCESS_KEY_ID from dotenv variable');
      profile.accessKeyId = parsed['ACCESS_KEY_ID'];
    }

    if (parsed['ACCESS_KEY_SECRET']) {
      debug('try to get ACCESS_KEY_SECRET from dotenv variable');
      profile.accessKeySecret = parsed['ACCESS_KEY_SECRET'];
    }

    if (parsed['SECURITY_TOKEN']) {
      debug('try to get SECURITY_TOKEN from dotenv variable');
      profile.securityToken = parsed['SECURITY_TOKEN'];
    }

    if (parsed['TIMEOUT']) {
      debug('try to get TIMEOUT from dotenv variable');
      profile.timeout = parsed['TIMEOUT'];
    }

    if (parsed['RETRIES']) {
      debug('try to get RETRIES from dotenv variable');
      profile.retries = parsed['RETRIES'];
    }

    if (parsed['FC_ENDPOINT']) {
      debug('try to get FC_ENDPOINT from dotenv variable');
      profile.fcEndpoint = parsed['FC_ENDPOINT'];
    }
  }

  return profile;
}