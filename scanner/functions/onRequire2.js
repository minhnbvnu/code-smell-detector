function onRequire2(shim, TestMod) {
        shim2 = shim
        shim.wrap(TestMod.prototype, 'foo', function wrapStuff(shim, orig) {
          return function wrapped2(...args) {
            shim.unwrap(TestMod.prototype, 'foo')
            return orig.apply(this, args)
          }
        })
      }