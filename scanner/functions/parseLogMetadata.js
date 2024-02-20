function parseLogMetadata(data) {
  const {supportedVersions} = getXVIZConfig();
  const {version: versionString} = data;

  let currentMajorVersion = null;
  if (versionString === undefined) {
    currentMajorVersion = 1;
  } else {
    const {major} = parseVersionString(versionString);
    currentMajorVersion = major;
  }

  if (!currentMajorVersion) {
    throw new Error('Unable to detect the XVIZ version.');
  } else {
    setXVIZConfig({currentMajorVersion});
  }

  if (supportedVersions && !supportedVersions.includes(currentMajorVersion)) {
    throw new Error(
      `XVIZ version ${currentMajorVersion} is not supported.  Currently supported versions are ${supportedVersions}.`
    );
  }

  return currentMajorVersion === 1 ? parseLogMetadataV1(data) : parseLogMetadataV2(data);
}