async function getPackageInfo(version, arh, channel, baseUrl) {
  let latestVersion = '';
  let possibleChannel = 'stable';

  if (channel) {
    possibleChannel = channel;
  }
  if (!version || version === 'latest') {
    latestVersion = await getLatestChromeVersion(possibleChannel);
  } else {
    latestVersion = await getLastChromedriverVersionFromMajor(version);
  }
  const url = resolveDownloadUrl(detectBrowserPlatformCustom(arh), latestVersion, baseUrl);

  return { latestVersion, url };
}