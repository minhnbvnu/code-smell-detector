function factRecency(a, b) {
    /*jshint noempty: false*/

    var i = 0;
    var aMatchRecency = a.match.recency,
        bMatchRecency = b.match.recency, aLength = aMatchRecency.length - 1, bLength = bMatchRecency.length - 1;
    while (aMatchRecency[i] === bMatchRecency[i] && i < aLength && i < bLength && i++) {
    }
    var ret = aMatchRecency[i] - bMatchRecency[i];
    if (!ret) {
        ret = aLength - bLength;
    }
    return ret;
}