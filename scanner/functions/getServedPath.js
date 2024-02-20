function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson)
  const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/') // 本 demo 中，servedUrl 为 reactSPA
  return ensureSlash(servedUrl, true)
}