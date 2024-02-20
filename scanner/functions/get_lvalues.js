function get_lvalues(expr) {
                    var lvalues = new Map();
                    if (expr instanceof AST_Unary)
                        return lvalues;
                    var tw = new TreeWalker(function (node) {
                        var sym = node;
                        while (sym instanceof AST_PropAccess)
                            sym = sym.expression;
                        if (sym instanceof AST_SymbolRef) {
                            const prev = lvalues.get(sym.name);
                            if (!prev || !prev.modified) {
                                lvalues.set(sym.name, {
                                    def: sym.definition(),
                                    modified: is_modified(compressor, tw, node, node, 0)
                                });
                            }
                        }
                    });
                    get_rvalue(expr).walk(tw);
                    return lvalues;
                }