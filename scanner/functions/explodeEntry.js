function explodeEntry(pattern, obj) {
  obj.optionalDependencies = obj.optionalDependencies || {};
  obj.dependencies = obj.dependencies || {};
  obj.uid = obj.uid || obj.version;
  obj.permissions = obj.permissions || {};
  obj.registry = obj.registry || 'npm';
  obj.name = obj.name || getName(pattern);
  const integrity = obj.integrity;
  if (integrity && integrity.isIntegrity) {
    obj.integrity = ssri.parse(integrity);
  }
  return obj;
}