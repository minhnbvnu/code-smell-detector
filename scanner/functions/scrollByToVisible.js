function scrollByToVisible(el, xGutter, yGutter) {
  let rect = el.getBoundingClientRect()
  let xDelta = 0
  let yDelta = 0
  xGutter = xGutter || 0
  yGutter = yGutter || 0

  let windowWidth = document.documentElement.clientWidth || document.body.clientWidth
  if(rect.right < xGutter) xDelta = rect.right - xGutter
  else if(rect.left > windowWidth - xGutter) xDelta = rect.left - windowWidth + xGutter

  let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
  if(rect.top < yGutter) yDelta = rect.top - yGutter
  else if(rect.bottom > windowHeight - yGutter) yDelta = rect.bottom - windowHeight + yGutter

  return {
    xDelta: xDelta,
    yDelta: yDelta
  }
}