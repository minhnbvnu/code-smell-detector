function _packDar (dataFolder, darPath) {
  b.custom(`Creating ${darPath}...`, {
    src: dataFolder + '/**/*',
    dest: darPath,
    execute (files) {
      return new Promise((resolve, reject) => {
        let zipfile = new yazl.ZipFile()
        for (let f of files) {
          let relPath = path.relative(dataFolder, f)
          zipfile.addFile(f, relPath)
        }
        zipfile.outputStream.pipe(fs.createWriteStream(darPath))
          .on('close', (err) => {
            if (err) {
              console.error(err)
              reject(err)
            } else {
              resolve()
            }
          })
        zipfile.end()
      })
    }
  })
}