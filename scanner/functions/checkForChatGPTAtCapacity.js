async function checkForChatGPTAtCapacity (page, opts = {}) {
  const {
    timeoutMs = Config.chromeTimeoutMS, // 2 minutes
    pollingIntervalMs = 3000,
    retries = 10
  } = opts

  // console.log('checkForChatGPTAtCapacity', page.url())
  let isAtCapacity = false
  let numTries = 0

  do {
    try {
      await solveSimpleCaptchas(page)

      const res = await page.$x("//div[contains(., 'ChatGPT is at capacity')]")
      isAtCapacity = !!res?.length

      if (isAtCapacity) {
        if (++numTries >= retries) {
          break
        }

        // try refreshing the page if chatgpt is at capacity
        await page.reload({
          waitUntil: 'networkidle2',
          timeout: timeoutMs
        })

        await common.sleep(pollingIntervalMs)
      }
    } catch (err) {
      // ignore errors likely due to navigation
      ++numTries
      break
    }
  } while (isAtCapacity)

  if (isAtCapacity) {
    const error = new Error('ChatGPT is at capacity')
    error.statusCode = 503
    throw error
  }
}