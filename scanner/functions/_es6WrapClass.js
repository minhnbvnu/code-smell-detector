function _es6WrapClass(shim, Base, fnName, spec, args) {
  return class WrappedClass extends Base {
    constructor() {
      const cnstrctArgs = shim.argsToArray.apply(shim, arguments)
      // Assemble the arguments to hand to the spec.
      const _args = [shim, Base, fnName, cnstrctArgs]
      if (args.length > 0) {
        _args.push.apply(_args, args)
      }

      // Call the spec's before hook, then call the base constructor, then call
      // the spec's after hook.
      spec.pre && spec.pre.apply(null, _args)
      super(...cnstrctArgs)
      spec.post && spec.post.apply(this, _args)
    }
  }
}