function saveKey(key) {
    if (keys[key] === undefined) {
        keysArr.push(key);
        keys[key] = keysNum++;
    }
}