function removeDiffSuffix(key) {
  if (_.endsWith(key, ADDED_SUFFIX)) {
    return key.substring(0, key.length - ADDED_SUFFIX.length);
  } else if (_.endsWith(key, DELETED_SUFFIX)) {
    return key.substring(0, key.length - DELETED_SUFFIX.length);
  } 
  
  return key;
}