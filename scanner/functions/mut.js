function mut(val, name) {
    const primitive = typeof val === "number" ? wrapInValue(val) : val;
    return new Mutable(primitive, name);
}