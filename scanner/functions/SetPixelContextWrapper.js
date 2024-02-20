function SetPixelContextWrapper() {
      function wrapFunction(newContext, name) {
        function wrapper() {
          resetContext();
          curContext[name].apply(curContext, arguments)
        }
        newContext[name] = wrapper
      }
      function wrapProperty(newContext, name) {
        function getter() {
          resetContext();
          return curContext[name]
        }
        function setter(value) {
          resetContext();
          curContext[name] = value
        }
        p.defineProperty(newContext, name, {
          get: getter,
          set: setter
        })
      }
      for (var n in curContext) if (typeof curContext[n] === "function") wrapFunction(this, n);
      else wrapProperty(this, n)
    }