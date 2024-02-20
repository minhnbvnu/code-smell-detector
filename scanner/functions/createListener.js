function createListener (handler, data) {
  const execute = (cb, e, ...args) => {
    if (typeof cb === 'function') {
      // fixed bug #48, #73
      const className = e.target && e.target.className
      if (typeof className === 'string' && className.indexOf('org-tree-node-btn') > -1) return

      cb.apply(null, [e, ...args])
    }
  }

  return function (e) {
    if (Array.isArray(handler)) {
      for (const cb of handler) {
        execute(cb, e, data)
      }
    } else {
      execute(handler, e, data)
    }
  }
}