function buildPlatformMenuMetadata() {
  const menuPath = path.join(
    CONFIG.repositoryRootPath,
    'menus',
    `${process.platform}.cson`
  );
  if (fs.existsSync(menuPath)) {
    return CSON.readFileSync(menuPath);
  } else {
    return null;
  }
}