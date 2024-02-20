function maintain_this_binding(parent, orig, val) {
            if (parent instanceof AST_UnaryPrefix && parent.operator == "delete"
                || parent instanceof AST_Call && parent.expression === orig
                    && (val instanceof AST_PropAccess
                        || val instanceof AST_SymbolRef && val.name == "eval")) {
                const zero = make_node(AST_Number, orig, { value: 0 });
                return make_sequence(orig, [zero, val]);
            }
            else {
                return val;
            }
        }