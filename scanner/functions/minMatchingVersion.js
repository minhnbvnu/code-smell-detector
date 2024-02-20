function minMatchingVersion(versionString) {
  try {
    const v = minVersion(versionString);
    return v.raw;
  } catch (_) {
    return undefined;
  }
}