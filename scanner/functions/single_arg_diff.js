function single_arg_diff() {
                var a = consequent.args;
                var b = alternative.args;
                for (var i = 0, len = a.length; i < len; i++) {
                    if (a[i] instanceof AST_Expansion)
                        return;
                    if (!a[i].equivalent_to(b[i])) {
                        if (b[i] instanceof AST_Expansion)
                            return;
                        for (var j = i + 1; j < len; j++) {
                            if (a[j] instanceof AST_Expansion)
                                return;
                            if (!a[j].equivalent_to(b[j]))
                                return;
                        }
                        return i;
                    }
                }
            }