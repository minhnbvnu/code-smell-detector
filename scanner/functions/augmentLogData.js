function augmentLogData(originalLog, agent, nameFromLevel) {
  // shallow copy, since we're modifying things
  const newLog = Object.assign({}, originalLog)
  newLog.timestamp = Date.now()
  newLog.level = nameFromLevel[originalLog.level]

  // put log message into a consistent spot and ensure it's not too long
  newLog.message = truncate(newLog.msg)

  // tidy up the error output to help with max length restrictions
  if (newLog.err) {
    newLog['error.message'] = truncate(newLog.err.message)
    newLog['error.stack'] = truncate(newLog.err.stack)
    newLog['error.class'] =
      newLog.err.name === 'Error' ? newLog.err.constructor.name : newLog.err.name
    // clear out the old error message
    delete newLog.err
  }

  // Add the metadata to the object being logged
  const metadata = agent.getLinkingMetadata(true)
  Object.keys(metadata).forEach((m) => {
    newLog[m] = metadata[m]
  })

  return newLog
}