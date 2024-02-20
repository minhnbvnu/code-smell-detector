function syncByPackage(packageName) {
  if (isPrivate) {
    return syncByNames(dependencies);
  }

  if (!argv.onlyPackage) {
    dependencies.unshift(packageName);
    return syncByNames(dependencies);
  }

  syncByNames([packageName]);
}