function removeMatching(array, testFunc) {
    var removeCnt = 0;
    var i = 0;
    while (i < array.length) {
        if (testFunc(array[i])) {
            array.splice(i, 1);
            removeCnt++;
        }
        else {
            i++;
        }
    }
    return removeCnt;
}