function convertPackageToCmd(pkgType, pkg, {
  indexUrl, registry
} = {}) {

  if (!_.includes(['pip', 'npm', 'apt-get'], pkgType)) {
    throw new Error(`unknow package type %${pkgType}`);
  }

  const defaultCmd = `fun-install ${pkgType} install ${pkg}`;

  if (indexUrl) {
    return `${defaultCmd} --index-url ${indexUrl}`;
  }

  if (registry) {
    return `${defaultCmd} --registry ${registry}`;
  }

  return defaultCmd;
}