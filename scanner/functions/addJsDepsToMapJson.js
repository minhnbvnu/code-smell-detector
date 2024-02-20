function addJsDepsToMapJson (filename, mapJson, deps) {
  mapJson['jsDeps'] = mapJson['jsDeps'] || {}
  mapJson['jsDeps'][filename] = mapJson['jsDeps'][filename] || {}
  if (mapJson['jsDeps'][filename]['sync']) {
    mapJson['jsDeps'][filename]['sync'] = mapJson['jsDeps'][filename]['sync'].concat(deps['sync'])
  } else {
    mapJson['jsDeps'][filename]['sync'] = deps['sync']
  }
  if (mapJson['jsDeps'][filename]['async']) {
    mapJson['jsDeps'][filename]['async'] = mapJson['jsDeps'][filename]['async'].concat(deps['async'])
  } else {
    mapJson['jsDeps'][filename]['async'] = deps['async']
  }
}