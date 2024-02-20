function arg_diff(consequent, alternative) {
            var a = consequent.args;
            var b = alternative.args;
            var len = a.length;
            if (len != b.length) return -2;
            for (var i = 0; i < len; i++) {
                if (!a[i].equivalent_to(b[i])) {
                    if (a[i] instanceof AST_Spread !== b[i] instanceof AST_Spread) return -3;
                    for (var j = i + 1; j < len; j++) {
                        if (!a[j].equivalent_to(b[j])) return -2;
                    }
                    return i;
                }
            }
            return -1;
        }