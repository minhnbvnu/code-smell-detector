function maybeAddPhantomObj(obj) {
    if (!obj.isEmpty() || !obj.propertyOf) return;
    obj.propertyOf.getProp(obj.propertyName).addType(new Obj(), WG_PHANTOM_OBJ);
    maybeAddPhantomObj(obj.propertyOf);
  }