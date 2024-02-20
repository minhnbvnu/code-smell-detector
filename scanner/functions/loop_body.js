function loop_body(x) {
            if (x instanceof AST_IterationStatement) {
                return x.body instanceof AST_BlockStatement ? x.body : x;
            }
            return x;
        }