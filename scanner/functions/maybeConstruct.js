function maybeConstruct(obj, klass) {
    if (obj instanceof klass) {
        return obj;
    }

    return new klass(obj);
}