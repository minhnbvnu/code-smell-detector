function runImmediately(obj) {
    return pc[obj.func].apply(pc, obj.args);
  }