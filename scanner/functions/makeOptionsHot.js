function makeOptionsHot (id, options) {
  if (options.functional) {
    const render = options.render
    options.render = (h, ctx) => {
      const instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function () {
      const record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function () {
      const instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}