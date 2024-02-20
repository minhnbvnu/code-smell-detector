function convertPropertyListToString (propertyList, joinUsing, includeDisabled = false, trimRequestBody = false) {
  let properties;

  properties = getMembersOfPropertyList(propertyList, includeDisabled);

  return _.join(_.map(properties, (prop) => {
    return (trimRequestBody ? prop.toString().trim() : prop.toString());
  }), joinUsing);
}