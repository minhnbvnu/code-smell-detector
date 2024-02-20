function prefixBinarySearch(items, prefix) {
    var startIndex = 0;
    var stopIndex = items.length - 1;
    var middle = Math.floor((stopIndex + startIndex) / 2);
    
    while (stopIndex > startIndex && middle >= 0 && items[middle].indexOf(prefix) !== 0) {
        if (prefix < items[middle]) {
            stopIndex = middle - 1;
        } else if (prefix > items[middle]) {
            startIndex = middle + 1;
        }
        middle = Math.floor((stopIndex + startIndex) / 2);
    }
    while (middle > 0 && items[middle-1].indexOf(prefix) === 0) {
        middle--;
    }
    return middle >= 0 ? middle : 0; // ensure we're not returning a negative index
}