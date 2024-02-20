function walk_prop(lhs) {
                if (lhs instanceof AST_Dot) {
                    walk_prop(lhs.expression);
                } else if (lhs instanceof AST_Sub) {
                    walk_prop(lhs.expression);
                    lhs.property.walk(tw);
                } else if (lhs instanceof AST_SymbolRef) {
                    var d = lhs.definition();
                    push_ref(d, lhs);
                    if (d.fixed) {
                        lhs.fixed = d.fixed;
                        if (lhs.fixed.assigns) {
                            lhs.fixed.assigns.push(node);
                        } else {
                            lhs.fixed.assigns = [ node ];
                        }
                    }
                } else {
                    lhs.walk(tw);
                }
            }