function augmentChildProcess (childProcess, withCoverage) {
  return new Promise((resolve, reject) => {
    let table = ''
    const errors = []

    if (withCoverage) {
      let isInTable = false

      childProcess.stdout.on('data', (data) => {
        // data can be either one line, or a bunch of lines
        // we need to process them line by line, so let's split them up here
        const lines = data.toString().split('\n').slice(0, -1)

        for (let line of lines) {
          // the table is missing the leftmost pipe, so we add it here
          line = formatLine(line)
          if (!isInTable && line && line.match(/^\|(-+\|)+/)) {
            // when we enter the table, mark that we're in the table and record that line
            isInTable = true
            table += line
          } else if (isInTable && line && !line.match(/Test Suites: /)) {
            // while we're in the table, record all lines
            table += line
          } else if (isInTable && line && line.match(/Test Suites: /)) {
            // when we exit the table, mark that we're outside the table
            isInTable = false
          }
        }

        // ignore all other lines
      })

      childProcess.stderr.on('data', (data) => {
        errors.push(data)
      })
    }

    childProcess.on('close', (code) => {
      if (code !== 0) {
        const error = new Error(errors.join('\n'))
        error.code = code
        reject(error)
      } else {
        resolve(table)
      }
    })
  })
}