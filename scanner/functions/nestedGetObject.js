function nestedGetObject(root, key, undefinedOnMissing = false, valueProperty = false) {
    console.assert(root);

    // Recursively finds the object to be modified and the child
    let parent = root;
    let i = key.indexOf('.');

    while (i !== -1) {
        parent = parent[key.substring(0, i)];
        if (parent === undefined && undefinedOnMissing) { return undefined; }
        if (valueProperty) { parent = parent.value; }
        key = key.substring(i + 1);
        i = key.indexOf('.');
    }

    if (undefinedOnMissing && (parent === undefined || parent[key] === undefined)) { return undefined; }
    
    return {parent: parent, object: parent[key], key: key};
}