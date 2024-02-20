function isObjC(p) {
    var klass = getObjCClassPtr(p);
    return !klass.isNull();
}