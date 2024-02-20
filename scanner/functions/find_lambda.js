function find_lambda() {
            var i = 0, p;
            while (p = compressor.parent(i++)) {
                if (p instanceof AST_Lambda) {
                    if (p instanceof AST_Accessor) return;
                    if (is_arrow(p)) continue;
                    fn_parent = compressor.parent(i);
                    return p;
                }
            }
        }