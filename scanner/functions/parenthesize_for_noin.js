function parenthesize_for_noin(node, output, noin) {
                var parens = false;
                // need to take some precautions here:
                //    https://github.com/mishoo/UglifyJS2/issues/60
                if (noin) {
                    parens = walk(node, node => {
                        // Don't go into scopes -- except arrow functions:
                        // https://github.com/terser/terser/issues/1019#issuecomment-877642607
                        if (node instanceof AST_Scope && !(node instanceof AST_Arrow)) {
                            return true;
                        }
                        if (node instanceof AST_Binary && node.operator == "in"
                            || node instanceof AST_PrivateIn) {
                            return walk_abort; // makes walk() return true
                        }
                    });
                }
                node.print(output, parens);
            }