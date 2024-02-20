function getPlatformSpecificPackageFilename(pkg) {
  // TODO support hash for all subdependencies that have installs scripts
  const normalizeScope = name => name[0] === '@' ? name.substr(1).replace('/', '-') : name;
  const suffix = getSystemParams();
  return `${normalizeScope(pkg.name)}-v${pkg.version}-${suffix}`;
}