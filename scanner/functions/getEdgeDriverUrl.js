function getEdgeDriverUrl(version) {
  const release = microsoftEdgeReleases[version];
  if (!release) {
    throw new Error(
      'Invalid Microsoft Edge Web Driver version see https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/#downloads'
    );
  }

  return release.url;
}