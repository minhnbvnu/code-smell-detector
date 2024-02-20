function getPublicMemberKeys(instance) {
  return Object.keys(instance).filter(k => k[0] !== '_');
}