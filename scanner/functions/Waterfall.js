function Waterfall(options = {}) {
    eventEmitter.call(this)
    this.opts = {
      number: options.number,
      fixWidth: options.fixWidth || null,
      width: `${options.width ||
        document.body.clientWidth ||
        document.documentElement.clientWidth}px`,
      container: options.container || 'waterfall',
      resize: false,
      scrollElem: options.scrollElem
    }
    this.init(options) // 这个 this 是 new 的时候，绑上去的
    this.bind()
  }