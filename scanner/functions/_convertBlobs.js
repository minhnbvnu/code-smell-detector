async function _convertBlobs (rawArchive) {
  let resources = rawArchive.resources
  let paths = Object.keys(resources)
  for (var i = 0; i < paths.length; i++) {
    let record = resources[paths[i]]
    if (record.encoding === 'blob') {
      record.data = await _blobToArrayBuffer(record.data)
    }
  }
}