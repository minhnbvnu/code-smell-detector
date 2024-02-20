async function waitForConditionOrAtCapacity (
  page,
  condition,
  opts = {}
) {
  const { pollingIntervalMs = 500 } = opts

  return new Promise((resolve, reject) => {
    let resolved = false

    async function waitForCapacityText () {
      if (resolved) {
        return
      }

      try {
        await checkForChatGPTAtCapacity(page)

        if (!resolved) {
          setTimeout(waitForCapacityText, pollingIntervalMs)
        }
      } catch (err) {
        if (!resolved) {
          resolved = true
          return reject(err)
        }
      }
    }

    condition()
      .then(() => {
        if (!resolved) {
          resolved = true
          resolve()
        }
      })
      .catch((err) => {
        if (!resolved) {
          resolved = true
          reject(err)
        }
      })

    setTimeout(waitForCapacityText, pollingIntervalMs)
  })
}