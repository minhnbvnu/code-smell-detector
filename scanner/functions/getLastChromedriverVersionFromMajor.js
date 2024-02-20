async function getLastChromedriverVersionFromMajor(version) {
  const response = await axios({
    method: 'get',
    url: 'https://googlechromelabs.github.io/chrome-for-testing/known-good-versions-with-downloads.json',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const versionsWithMajor = response.data.versions.filter(
    (f) =>
      validateMajorVersionPrefix(f.version) === validateMajorVersionPrefix(version) && 'chromedriver' in f.downloads
  );
  versionsWithMajor
    .sort((version1, version2) => {
      return version1.version.localeCompare(version2.version, undefined, { numeric: true, sensitivity: 'base' });
    })
    .reverse();

  return versionsWithMajor.length ? versionsWithMajor[0] : null;
}