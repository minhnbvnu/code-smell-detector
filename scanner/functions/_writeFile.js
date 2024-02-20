function _writeFile (fs, p, data, encoding) {
  return new Promise((resolve, reject) => {
    if (typeof data.pipe === 'function') {
      let file = fs.createWriteStream(p)
      data.pipe(file)
      file.on('close', () => {
        resolve()
      })
    } else {
      fs.writeFile(p, data, encoding, (err) => {
        if (err) reject(err)
        else resolve()
      })
    }
  })
}