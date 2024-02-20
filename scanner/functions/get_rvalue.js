function get_rvalue(expr) {
                    if (expr instanceof AST_Assign) {
                        return expr.right;
                    }
                    else {
                        return expr.value;
                    }
                }