function getTranslateY(el) {
        var transform = window.getComputedStyle(el)[vendor.transform],
            values;
        if (transform && (values = transform.match(/^matrix(3d)?(.*)$/i))) {
            if (values && values[2]) {
                return parseInt(values[2].replace(/ /g, '').split(',')[values[1] ? 13 : 5], 10);
            }
        }
        return 0;
    }