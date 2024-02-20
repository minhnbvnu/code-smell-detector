function updateInstanceWatchers (vm) {
  let i = vm._watchers.length
  while (i--) {
    vm._watchers[i].update(true) // shallow updates
  }
}