function recordAsynchronizers(shim, _fn, name) {
  return { name: 'timers.' + name, callback: shim.FIRST }
}