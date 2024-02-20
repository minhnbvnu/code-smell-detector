function getDataDir() {
  if (process.platform === 'win32') {
    const WIN32_APPDATA_DIR = getLocalAppDataDir();
    return WIN32_APPDATA_DIR == null ? FALLBACK_CONFIG_DIR : path.join(WIN32_APPDATA_DIR, 'Data');
  } else if (process.env.XDG_DATA_HOME) {
    return path.join(process.env.XDG_DATA_HOME, 'yarn');
  } else {
    // This could arguably be ~/Library/Application Support/Yarn on Macs,
    // but that feels unintuitive for a cli tool

    // Instead, use our prior fallback. Some day this could be
    // path.join(userHome, '.local', 'share', 'yarn')
    // or return path.join(WIN32_APPDATA_DIR, 'Data') on win32
    return FALLBACK_CONFIG_DIR;
  }
}