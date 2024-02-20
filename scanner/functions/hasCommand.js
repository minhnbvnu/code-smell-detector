function hasCommand(str) {
  return !!which.sync(str, { nothrow: true })
}