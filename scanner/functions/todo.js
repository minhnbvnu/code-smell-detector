function todo (content) {
  extendObservable(this, {
    startAt: Date.now(),
    isFinish: false,
    uid: uid++,
    content,
    toggle: function() {
      this.isFinish = !this.isFinish
    }
  })
}