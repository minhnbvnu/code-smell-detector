function coerceCreatePackageName(str) {
  const pkgNameObj = parsePackageName(str);
  const coercedName = pkgNameObj.name !== '' ? `create-${pkgNameObj.name}` : `create`;
  const coercedPkgNameObj = (0, (_extends2 || _load_extends()).default)({}, pkgNameObj, {
    name: coercedName,
    fullName: [pkgNameObj.scope, coercedName].filter(Boolean).join('/'),
    full: [pkgNameObj.scope, coercedName, pkgNameObj.path].filter(Boolean).join('/')
  });
  return coercedPkgNameObj;
}