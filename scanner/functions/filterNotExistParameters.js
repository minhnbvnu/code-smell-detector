function filterNotExistParameters(profile) {
  const propsRequired = ['accountId', 'accessKeyId', 'accessKeySecret', 'defaultRegion'];
  return propsRequired.filter(paramter => {
    return !profile.hasOwnProperty(paramter);
  });
}