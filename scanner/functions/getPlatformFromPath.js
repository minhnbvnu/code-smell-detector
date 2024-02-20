function getPlatformFromPath(filepath) {
  filepath = removeExtName(filepath);
  if (endsWith(filepath, 'Android')) {
    return ANDROID_SUFFIX;
  } else if (endsWith(filepath, 'IOS')) {
    return IOS_SUFFIX;
  }
  return CROSS_SUFFIX;
}