function Formatio(options) {
    // eslint-disable-next-line guard-for-in
    for (var opt in options) {
        this[opt] = options[opt];
    }
}