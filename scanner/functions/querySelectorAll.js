function querySelectorAll(selector) {
    var result = document.querySelectorAll(selector);
    if (isDOMList(result)) {
        return result;
    } else {
        return [result];
    }
}