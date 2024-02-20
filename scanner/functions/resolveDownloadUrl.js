function resolveDownloadUrl(platform, buildId, baseUrl = 'https://storage.googleapis.com/chrome-for-testing-public') {
  return `${baseUrl}/${resolveDownloadPath(platform, buildId).join('/')}`;
}