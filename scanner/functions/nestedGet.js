function nestedGet(root, key, undefinedOnMissing, valueProperty) {
    console.assert(root);
    const k = nestedGetObject(root, key, undefinedOnMissing, valueProperty);
    if (undefinedOnMissing && k === undefined) { return undefined; }
    return k.object;
}