function spinLoop(cb) {
  const DELAY = 5
  const COUNT = 20
  let spins = 0

  timeout()
  function timeout() {
    setTimeout(function () {
      let trash = []
      for (let i = 0; i < 100000; ++i) {
        trash.push([{ i: i }])
      }
      trash = null

      if (++spins < COUNT) {
        timeout()
      } else {
        setImmediate(cb)
      }
    }, DELAY)
  }
}