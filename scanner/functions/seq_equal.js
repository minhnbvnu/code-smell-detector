function seq_equal(seq_1, seq_2) {
    if (seq_1.length !== seq_2.length) {
        return false;
    }

    for (var i = 0; i < seq_1.length; ++i) {
        if (seq_1[i] !== seq_2[i]) {
            return false;
        }
    }

    return true;
}