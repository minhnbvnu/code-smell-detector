function cons_seq(right) {
                    n--;
                    CHANGED = true;
                    var left = prev.body;
                    return make_sequence(left, [left, right]).transform(compressor);
                }