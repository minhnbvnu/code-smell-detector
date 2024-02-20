function trim_unreachable_code(compressor, stat, target) {
            walk(stat, node => {
                if (node instanceof AST_Var) {
                    node.remove_initializers();
                    target.push(node);
                    return true;
                }
                if (node instanceof AST_Defun
                    && (node === stat || !compressor.has_directive("use strict"))) {
                    target.push(node === stat ? node : make_node(AST_Var, node, {
                        definitions: [
                            make_node(AST_VarDef, node, {
                                name: make_node(AST_SymbolVar, node.name, node.name),
                                value: null
                            })
                        ]
                    }));
                    return true;
                }
                if (node instanceof AST_Export || node instanceof AST_Import) {
                    target.push(node);
                    return true;
                }
                if (node instanceof AST_Scope) {
                    return true;
                }
            });
        }