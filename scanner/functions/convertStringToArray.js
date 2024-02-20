function convertStringToArray(arrayLike) {
    if (!arrayLike) {
        return [];
    }

    if (typeof arrayLike === 'object') {
        return Object.keys(arrayLike).map((itemKey) => arrayLike[itemKey]);
    }

    return arrayLike
        .replace(/\s/g, '')
        .split(',')
        .map((itemName) => itemName.replace(/_/g, ' ', itemName));
}