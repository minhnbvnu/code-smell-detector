function getCrossImportPackage(id) {
    // Node libraries packages can't require Atom builtins.
    if (ATOM_BUILTIN_PACKAGES.has(id)) {
      if (ownPackageType === NODE_LIBRARY) {
        return {type: 'NO_NODE_TO_ATOM_BUILTIN', name: id};
      } else {
        return null;
      }
    }

    if (ATOM_IDE_PACKAGES.has(id)) {
      if (ownPackageType === NODE_LIBRARY) {
        return {type: 'NO_NODE_TO_ATOM_UI_PACKAGES', name: id};
      } else {
        return null;
      }
    }

    const resolved = resolveFrom(dirname, id);
    // Exclude modules that are not found, builtins, or not ours.
    if (
      resolved == null ||
      resolved === id ||
      resolved.includes('/node_modules/')
    ) {
      return null;
    }
    const resolvedPackage = getPackage(resolved);

    const resolvedPackageType =
      resolvedPackage.nuclide && resolvedPackage.nuclide.packageType;
    // Requiring anything within our own package is ok.
    if (resolvedPackage.__dirname === ownPackage.__dirname) {
      return null;
    }
    // An Atom package/library requiring a whitelisted package is ok.
    if (
      [ATOM_LIBRARY, ATOM_PACKAGE].includes(ownPackageType) &&
      whitelist.has(resolvedPackage.name)
    ) {
      return null;
    }
    // Nothing can require into an Atom package
    if (resolvedPackageType === ATOM_PACKAGE) {
      return {type: 'NO_ATOM', name: resolvedPackage.name};
    }
    // Node packages can only require other npm packages.
    if (
      ownPackageType === NODE_LIBRARY &&
      (resolvedPackageType === ATOM_LIBRARY ||
        resolvedPackageType === ATOM_PACKAGE)
    ) {
      return {type: 'NO_NODE_TO_ATOM', name: resolvedPackage.name};
    }

    return null;
  }