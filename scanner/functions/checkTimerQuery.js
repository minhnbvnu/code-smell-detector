function checkTimerQuery(timerQuery, gl, pass) {
  const available = gl.getQueryParameter(timerQuery, gl.QUERY_RESULT_AVAILABLE)
  if (available) {
    const elapsedTimeInNs = gl.getQueryParameter(timerQuery, gl.QUERY_RESULT)
    const elapsedTimeInMs = elapsedTimeInNs / 1000000
    pass.lastTime = elapsedTimeInMs
  } else {
    // If the result is not available yet, check again after a delay
    setTimeout(() => {
      checkTimerQuery(timerQuery, gl, pass)
    }, 1)
  }
}