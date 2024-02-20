function appendValue(x) {
            if (x instanceof Array) {
                result += " [";
                for (var i = 0, n = x.length; i < n; i++) {
                    if (i > 0)
                        result += ", ";
                    result += x[i];
                }
                result += "]";
            } else if (x instanceof Fixup) {
                result += " " + (+x);
            } else if (table(x)) {
                appendTable(x);
            } else {
                result += " " + uneval(x);
            }
        }