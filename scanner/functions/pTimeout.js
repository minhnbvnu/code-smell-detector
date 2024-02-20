async function pTimeout (
  promise,
  options
) {
  const {
    milliseconds,
    fallback,
    message,
    customTimers = { setTimeout, clearTimeout }
  } = options

  let timer

  const cancelablePromise = new Promise((resolve, reject) => {
    if (typeof milliseconds !== 'number' || Math.sign(milliseconds) !== 1) {
      throw new TypeError(
          `Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``
      )
    }

    if (milliseconds === Number.POSITIVE_INFINITY) {
      resolve(promise)
      return
    }

    if (options.signal) {
      const { signal } = options
      if (signal.aborted) {
        reject(getAbortedReason(signal))
      }

      signal.addEventListener('abort', () => {
        reject(getAbortedReason(signal))
      })
    }

    timer = customTimers.setTimeout.call(
      undefined,
      () => {
        if (fallback) {
          try {
            resolve(fallback())
          } catch (error) {
            reject(error)
          }

          return
        }

        const errorMessage =
              typeof message === 'string'
                ? message
                : `Promise timed out after ${milliseconds} milliseconds`
        const timeoutError =
              message instanceof Error ? message : new Error(errorMessage)

        if (typeof promise.cancel === 'function') {
          promise.cancel()
        }

        reject(timeoutError)
      },
      milliseconds
    )
    ;(async () => {
      try {
        resolve(await promise)
      } catch (error) {
        reject(error)
      } finally {
        customTimers.clearTimeout.call(undefined, timer)
      }
    })()
  })

  cancelablePromise.clear = () => {
    customTimers.clearTimeout.call(undefined, timer)
    timer = undefined
  }

  return cancelablePromise
}