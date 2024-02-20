async function getProfile() {
  const profile = await getProfileFromDotEnv();

  if (isTrue(profile.enableCustomEndpoint)) { return profile; }

  const notExistParams = filterNotExistParameters(profile);

  if (!_.isEmpty(notExistParams)) {
    console.error(red(''));
    throw new Error(red(`Fun is not properly configured. Missing '${notExistParams.join(', ')}' configuration. Please run 'fun config' first.\nRefer to https://github.com/alibaba/funcraft/blob/master/docs/usage/getting_started-zh.md#配置 for more help.`));
  }

  return profile;
}