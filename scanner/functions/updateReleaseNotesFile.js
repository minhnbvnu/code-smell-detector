function updateReleaseNotesFile(file, version, newNotes) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }

      if (data.startsWith(`### ${version}`)) {
        const errMessage = [
          `${file} already contains '${version}'`,
          `Delete existing ${version} release notes (if desired) and run again`
        ].join('\n')

        reject(new Error(errMessage))
      }

      const todayFormatted = getReleaseDate()
      const newVersionHeader = `### ${version} (${todayFormatted})`

      const newContent = [newVersionHeader, newNotes, '\n\n', data].join('')

      fs.writeFile(file, newContent, 'utf8', (writeErr) => {
        if (writeErr) {
          reject(err)
        }

        console.log(`Added new release notes to ${file} under ${newVersionHeader}`)

        resolve()
      })
    })
  })
}