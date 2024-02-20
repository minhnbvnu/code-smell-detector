function withSuper(ctor, obj, f) {
    var oldCtor = cx.curSuperCtor,
        oldObj = cx.curSuper;
    cx.curSuperCtor = ctor;
    cx.curSuper = obj;
    var result = f();
    cx.curSuperCtor = oldCtor;
    cx.curSuper = oldObj;
    return result;
  }