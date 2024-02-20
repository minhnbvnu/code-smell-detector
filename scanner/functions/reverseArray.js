function reverseArray(input) {
    var ret = [];
    for (var i = input.length - 1; i >= 0; i--) {
        ret.push(input[i]);
    }
    return ret;
}