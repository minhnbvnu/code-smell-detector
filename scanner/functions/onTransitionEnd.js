function onTransitionEnd(data, duration, callback) {
  // Make callback synchronous if duration is 0
  if (!duration) {
    return callback()
  }

  const { tooltip } = getInnerElements(data.popper)

  let transitionendFired = false

  const listenerCallback = e => {
    if (e.target === tooltip && !transitionendFired) {
      transitionendFired = true
      callback()
    }
  }

  // Fire callback upon transition completion
  tooltip.addEventListener('webkitTransitionEnd', listenerCallback)
  tooltip.addEventListener('transitionend', listenerCallback)

  // Fallback: transitionend listener sometimes may not fire
  clearTimeout(data._transitionendTimeout)
  data._transitionendTimeout = setTimeout(() => {
    if (!transitionendFired) {
      callback()
    }
  }, duration)
}