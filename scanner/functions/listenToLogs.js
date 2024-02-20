function listenToLogs(logsLocation) {
      const child = childProcess.spawn('tail', [...args, logsLocation], {
        cwd: process.cwd(),
      })

      if (child.stdout) {
        child.stdout.on('data', data => {
          console.log(
            String(data)
              .replace(/ «Plugin Output»/g, '')
              .replace(/\n$/g, '')
          )
        })
      }

      if (child.stderr) {
        child.stderr.on('data', data => {
          const dataString = String(data)
          if (dataString.indexOf('No such file or directory')) {
            count[logsLocation] += 1
            // touch the file so that we can listen to it
            return (
              exec(`touch "${logsLocation}"`)
                // restart the listening for this log
                .then(() => listenToLogs(logsLocation))
                .catch(err => {
                  // if we can't create the file it means that the variant is not present
                  if (err.message.indexOf('No such file or directory')) {
                    checkEnd(logsLocation)
                    return
                  }
                  error('while reading the logs')
                  done(err)
                })
            )
          }
          return console.error(String(data))
        })
      }

      child.on('exit', () => {
        checkEnd(logsLocation)
      })

      child.on('error', err => {
        error('while reading the logs')
        killAll()
        done(err)
      })

      childProcesses.push(child)
    }