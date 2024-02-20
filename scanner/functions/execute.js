function execute() {
      var listeners,
          async = isAsync(bench);

      if (async) {
        // use `getNext` as the first listener
        bench.on('complete', getNext);
        listeners = bench.events.complete;
        listeners.splice(0, 0, listeners.pop());
      }
      // execute method
      result[index] = isClassOf(bench && bench[name], 'Function') ? bench[name].apply(bench, args) : undefined;
      // if synchronous return true until finished
      return !async && getNext();
    }