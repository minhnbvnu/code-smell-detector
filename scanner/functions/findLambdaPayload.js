function findLambdaPayload(rawLogData) {
  const logLines = rawLogData.split('\n')
  for (let i = 0; i < logLines.length; i++) {
    const logLine = logLines[i]
    if (logLine.includes('NR_LAMBDA_MONITORING')) {
      return logLine
    }
  }
}