function bindPromise(promise, segment) {
  return this.interceptPromise(promise, function thenTouch() {
    segment.opaque = false
    segment.touch()
  })
}