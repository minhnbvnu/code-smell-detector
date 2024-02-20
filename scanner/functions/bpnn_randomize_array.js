function bpnn_randomize_array(w, m, n) {
    var i = 0,
        l = (m + 1) * (n + 1);

    for (i = 0; i < l; i++) {
        w[i] = Math.random();
    }
}