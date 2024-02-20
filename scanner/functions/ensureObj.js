function ensureObj(tp) {
    if (!tp || !(tp = tp.getType()) || !(tp instanceof infer.Obj)) return null;
    return tp;
  }