function trim_tails(string) {
    var arr = string.split('\n');

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace(/[\s\uFEFF\xA0]+$/g, '');
    }

    return arr.join('\n');
}