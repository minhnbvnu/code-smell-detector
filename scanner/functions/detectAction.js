function detectAction(key, value) {
  if (_.endsWith(key, ADDED_SUFFIX)) {
    return 'Add';
  } else if (_.endsWith(key, DELETED_SUFFIX)) {
    return 'Delete';
  } else if (value && value['__new']) {
    return 'Modify';
  } return null;
}