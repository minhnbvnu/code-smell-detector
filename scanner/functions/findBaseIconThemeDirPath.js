function findBaseIconThemeDirPath() {
  const defaultBaseIconThemeDir = '/usr/share/icons/hicolor';
  const dataDirsString = process.env.XDG_DATA_DIRS;
  if (dataDirsString) {
    const dataDirs = dataDirsString.split(path.delimiter);
    if (dataDirs.includes('/usr/share/') || dataDirs.includes('/usr/share')) {
      return defaultBaseIconThemeDir;
    } else {
      return path.join(dataDirs[0], 'icons', 'hicolor');
    }
  } else {
    return defaultBaseIconThemeDir;
  }
}