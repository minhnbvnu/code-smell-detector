function convertPropListToStringUrlEncoded (propertyList, joinUsing, includeDisabled = false, trimRequestBody = false) {
  const properties = getMembersOfPropertyList(propertyList, includeDisabled),
    keyvalues = [];

  properties.forEach((property) => {
    const key = trimRequestBody ? property.key.trim() : property.key,
      value = trimRequestBody ? property.value.trim() : property.value,
      keyvalue = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

    keyvalues.push(keyvalue);
  });

  return keyvalues.join(joinUsing);
}