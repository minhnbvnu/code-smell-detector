function loadInput(w, m, n) {
    var i = 1,
        l = (m + 1) * (n + 1);

    for (i = 1; i < l; i++) {
        w[i] = Math.random();
    }
}