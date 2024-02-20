async function conditionPromise (condition) {
  const startTime = Date.now()

  while (true) {
    await timeoutPromise(100)

    if (await condition()) {
      return
    }

    if (Date.now() - startTime > 5000) {
      throw new Error('Timed out waiting on condition')
    }
  }
}