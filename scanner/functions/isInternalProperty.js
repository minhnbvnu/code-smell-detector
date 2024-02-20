function isInternalProperty(property) {
  if (
    [
      '_state',
      '_states',
      '_target',
      '_currentState',
      '_super',
      '_debugContainerKey',
      '_transitionTo',
      '_debugInfo',
      '_showProxyDetails',
    ].includes(property)
  ) {
    return true;
  }

  let isInternalProp = [
    '__LEGACY_OWNER',
    '__ARGS__',
    '__HAS_BLOCK__',
    '__PROPERTY_DID_CHANGE__',
  ].some((internalProp) => property.startsWith(internalProp));

  return isInternalProp;
}