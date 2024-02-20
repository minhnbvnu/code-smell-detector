function alignLeft(str, len, ch) {
        return str + new Array(len - str.length + 1).join(ch || " ");
    }