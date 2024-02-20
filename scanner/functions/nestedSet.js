function nestedSet(root, key, value, valueProperty) {
    const k = nestedGetObject(root, key, false, valueProperty);
    k.parent[k.key] = value;
}