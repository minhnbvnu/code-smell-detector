function handleMkdirError (err) {
      return next(error('Could not create output folder ' + options.path, err))
    }