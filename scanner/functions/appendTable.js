function appendTable(x) {
            for (var k in x) {
                var v = x[k];
                if (x.hasOwnProperty(k) && k !== "opcode" && typeof v !== "function") {
                    if (!table(v))
                        result += " " + k + ":";
                    appendValue(v);
                }
            }
        }