function implodeEntry(pattern, obj) {
  const inferredName = getName(pattern);
  const integrity = obj.integrity ? serializeIntegrity(obj.integrity) : '';
  const imploded = {
    name: inferredName === obj.name ? undefined : obj.name,
    version: obj.version,
    uid: obj.uid === obj.version ? undefined : obj.uid,
    resolved: obj.resolved,
    registry: obj.registry === 'npm' ? undefined : obj.registry,
    dependencies: blankObjectUndefined(obj.dependencies),
    optionalDependencies: blankObjectUndefined(obj.optionalDependencies),
    permissions: blankObjectUndefined(obj.permissions),
    prebuilt2Variants: blankObjectUndefined(obj.prebuilt2Variants)
  };
  if (integrity) {
    imploded.integrity = integrity;
  }
  return imploded;
}