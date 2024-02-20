function checkFinished() {
  // check if all child processes have finished, and if so, exit
  childProcesses.pop()
  if (isStreamClosed && childProcesses.length === 0) {
    printResult(startTime, attempts)
    process.exit(EXIT_CODE_FAILURE)
  }
}