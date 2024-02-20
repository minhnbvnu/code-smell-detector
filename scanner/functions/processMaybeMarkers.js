function processMaybeMarkers(s) {
    return s.replace(MAYBE_REGEXP, function (m0, m1) {
        if (m1.match(/[1-9]/)) {
            return m1;
        }
        else {
            return '';
        }
    });
}