function shift (...args) {
    const job = jobs.shift()
    let result
    try {
      result = job(...args)
    } catch (e) {
      jobs.length = 0
      done(e)
    }

    // wait for nextTick
    if (result !== undefined) {
      if (result.then) {
        result.then(shift)
      } else {
        shift(result)
      }
    } else if (jobs.length) {
      requestAnimationFrame(() => Vue.nextTick(shift))
    }
  }