function ensureNasParams(nasConfig) {
  const propsRequired = ['Auto', 'UserId', 'GroupId'];

  const notExistParams = propsRequired.filter(paramter => {
    return !nasConfig.hasOwnProperty(paramter);
  });

  if (!_.isEmpty(notExistParams)) {
    console.error(red(''));
    throw new Error(red(`Missing '${notExistParams.join(', ')}' in NasConfig.`));
  }
  if (!_.isEmpty(nasConfig.MountPoints)) {
    console.error(red(''));
    throw new Error(red(`Additional properties: 'MountPoints' in NasConfig.`));
  }
}