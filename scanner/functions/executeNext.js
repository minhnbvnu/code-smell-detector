function executeNext() {
    if (queue.length > 0) {
      var obj = queue.shift();

      pc[obj.func].apply(pc, obj.args);

      if (obj.wait)
      {
        pending = obj;
      } else {
        executeNext();
      }
    } else {
      pending = null;
    }
  }