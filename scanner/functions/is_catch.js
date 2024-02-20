function is_catch(node) {
                        var sym = node.definition();
                        return sym.orig[0] instanceof AST_SymbolCatch && sym.scope.resolve() === node.scope.resolve();
                    }