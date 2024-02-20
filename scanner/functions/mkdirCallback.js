function mkdirCallback (err) {
      if (err) handleMkdirError(err)

      const outputPath = options.keepInMemory
        ? localFs.join(options.path, options.filename)
        : path.join(options.path, options.filename)

      localFs.readFile(outputPath, 'utf8', function (err, data) {
        // if file does not exist, just write data to it
        if (err && err.code !== 'ENOENT') {
          return next(error('Could not read output file ' + outputPath, err))
        }

        // if options.update is false and we're on first run, so start with empty data
        data = overwrite ? '{}' : data || '{}'

        let oldAssets
        try {
          oldAssets = JSON.parse(data)
        } catch (err) {
          oldAssets = {}
        }

        const assets = orderAssets(_.merge({}, oldAssets, newAssets), options)
        const output = options.processOutput(assets)
        if (output !== data) {
          localFs.writeFile(outputPath, output, function (err) {
            if (err) {
              return next(error('Unable to write to ' + outputPath, err))
            }
            firstRun = false
            next()
          })
        } else {
          next()
        }
      })
    }