function $mutate(obj, key, op, val) {
    return obj[key] = op(obj[key], val);
}