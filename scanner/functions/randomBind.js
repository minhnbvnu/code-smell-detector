function randomBind() {
  const n = Math.random()
  if (n >= 0.75) {
    allParamBind()
  } else if (n >= 0.5) {
    twoParamBind()
  } else if (n >= 0.25) {
    oneParamBind()
  } else {
    nullSegmentBind()
  }
}