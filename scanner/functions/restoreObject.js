function restoreObject(object) {
    return walkObject(restore, object, filter);
}