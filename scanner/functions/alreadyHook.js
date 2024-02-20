function alreadyHook(str) {
    for (var i = 0; i < hookedArray.length; i++) {
        if (str == hookedArray[i]) {
            return true;
        }
    }
    return false;
}