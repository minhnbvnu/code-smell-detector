function toQuantifier(digits) {
        let [start = 0, stop = ''] = digits;
        if (stop || start > 1) {
            return `{${start + (stop ? ',' + stop : '')}}`;
        }
        return '';
    }