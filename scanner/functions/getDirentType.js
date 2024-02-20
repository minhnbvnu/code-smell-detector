function getDirentType(mode) {
  const ktype = MODE_TO_KTYPE[mode & constants.S_IFMT];

  if (ktype === undefined) {
    return constants.UV_DIRENT_UNKNOWN;
  }

  return ktype;
}