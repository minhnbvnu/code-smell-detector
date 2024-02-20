function can_declare_defun(fn) {
                        if (!is_var || compressor.has_directive("use strict") || !(fn instanceof AST_Function)) {
                            return parent instanceof AST_Scope;
                        }
                        return parent instanceof AST_Block
                            || parent instanceof AST_For && parent.init === node
                            || parent instanceof AST_If;
                    }