function addReleaseNotesFile(body, version) {
  const FILE = getFileName(version)
  return new Promise((resolve, reject) => {
    fs.writeFile(FILE, body, 'utf8', (writeErr) => {
      if (writeErr) {
        reject(writeErr)
      }

      console.log(`Added new release notes ${FILE}`)
      resolve()
    })
  })
}