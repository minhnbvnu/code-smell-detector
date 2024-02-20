function _group(nodeLevel, options) {
    const f = options.groups.filter(val => (val <= nodeLevel));
    return f.length ? f[f.length - 1] : options.groups[0];
}