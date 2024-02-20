function isUserObject(e) {
    if (!e || "Object" !== toStringTag(e)) return !1;
    var t = r(e);
    return !t || hasConstructorOf(e, Object) || isUserObject(t);
  }