function makeSticky(refData) {
  const {
    popper,
    popperInstance,
    settings: {
      stickyDuration
    }
  } = refData

  const applyTransitionDuration = () =>
    popper.style[prefix('transitionDuration')] = `${stickyDuration}ms`

  const removeTransitionDuration = () =>
    popper.style[prefix('transitionDuration')] = ''

  const updatePosition = () => {
    popperInstance && popperInstance.scheduleUpdate()

    applyTransitionDuration()

    isVisible(popper)
      ? window.requestAnimationFrame(updatePosition)
      : removeTransitionDuration()
  }

  // Wait until Popper's position has been updated initially
  defer(updatePosition)
}