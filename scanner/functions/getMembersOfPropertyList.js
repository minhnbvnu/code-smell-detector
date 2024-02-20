function getMembersOfPropertyList (propertyList, includeDisabled = false) {
  /* istanbul ignore else */
  if (!includeDisabled) {
    return _.reject(propertyList.members, 'disabled');
  }

  return propertyList.members;
}