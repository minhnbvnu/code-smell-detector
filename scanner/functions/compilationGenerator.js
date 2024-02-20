function compilationGenerator(eager, $compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext) {
      var compiled;

      if (eager) {
        return compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext);
      }
      return function lazyCompilation() {
        if (!compiled) {
          compiled = compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext);

          // Null out all of these references in order to make them eligible for garbage collection
          // since this is a potentially long lived closure
          $compileNodes = transcludeFn = previousCompileContext = null;
        }
        return compiled.apply(this, arguments);
      };
    }