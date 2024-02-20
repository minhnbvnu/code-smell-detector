function formatPlayerTime (time) {
  var minutes = formatNumber(Math.floor(time / 60))
  var seconds = formatNumber(Math.floor(time % 60))
  return `${minutes}:${seconds}`
}