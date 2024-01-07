function removeFromArray(obj, array) {
    const i = array.indexOf(obj);
    if (i > -1) {
        array.splice(i, 1);
    }
}