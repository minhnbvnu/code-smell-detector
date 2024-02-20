function _blobToArrayBuffer (blob) {
  return new Promise((resolve, reject) => {
    // TODO: is there other way to get buffer out of Blob without browser APIs?
    fs.readFile(blob.path, (err, buffer) => {
      if (err) return reject(err)
      resolve(buffer)
    })
  })
}