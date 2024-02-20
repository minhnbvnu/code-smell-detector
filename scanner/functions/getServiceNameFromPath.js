function getServiceNameFromPath (path) {
  const parts = path.split('/')
  return parts[1]
}