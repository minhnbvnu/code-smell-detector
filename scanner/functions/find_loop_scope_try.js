function find_loop_scope_try() {
                var node = compressor.self(), level = 0, in_loop = false, in_try = false;
                do {
                    if (node instanceof AST_IterationStatement) {
                        in_loop = true;
                    }
                    else if (node instanceof AST_Scope) {
                        break;
                    }
                    else if (node instanceof AST_TryBlock) {
                        in_try = true;
                    }
                } while (node = compressor.parent(level++));
                return { in_loop, in_try };
            }