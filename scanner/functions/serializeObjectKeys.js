function serializeObjectKeys(obj) {
    return _(obj)
        .toPairs()
        .sortBy(a => a[0])
        .map(a => a[1])
        .value();
}