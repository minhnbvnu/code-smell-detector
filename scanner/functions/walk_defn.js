function walk_defn() {
                scan_declaration(tw, compressor, node.name, function() {
                    return node.value || make_node(AST_Undefined, node);
                }, function(name, fixed) {
                    var d = name.definition();
                    if (fixed && safe_to_assign(tw, d, true)) {
                        mark(tw, d);
                        tw.loop_ids[d.id] = tw.in_loop;
                        d.fixed = fixed;
                        d.fixed.assigns = [ node ];
                        if (name instanceof AST_SymbolConst && d.redefined()
                            || !(can_drop_symbol(name) || is_safe_lexical(d))) {
                            d.single_use = false;
                        }
                    } else {
                        d.fixed = false;
                    }
                });
            }