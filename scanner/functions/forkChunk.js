function forkChunk(chunk) {
  const child = fork(join(__dirname, 'process-chunk.js'))
  childProcesses.push(child)
  child.send({ chunk, content, signature, algorithm })
  child.on('message', (result) => {
    attempts += chunk.length
    if (result === null && attempts % (CHUNK_SIZE * 5) === 0) {
      const speed = numberFormatter(Math.trunc(attempts / timeTaken(startTime)))
      console.log(
        `Attempts: ${attempts} (${speed}/s last attempt was '${
          chunk[chunk.length - 1]
        }')`,
      )
    }
    if (result) {
      // secret found, print result and exit
      printResult(startTime, attempts, result)
      process.exit(EXIT_CODE_SUCCESS)
    }
  })

  child.on('exit', checkFinished)
}