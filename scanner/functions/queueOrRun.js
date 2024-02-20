function queueOrRun(obj) {
    if (null === pending) {
      pc[obj.func].apply(pc, obj.args);

      if (obj.wait) {
        pending = obj;
      }
    } else {
      queue.push(obj);
    }
  }