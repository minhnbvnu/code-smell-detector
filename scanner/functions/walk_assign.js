function walk_assign() {
                var recursive = ld && recursive_ref(tw, ld);
                var modified = is_modified(compressor, tw, node, right, 0, is_immutable(right), recursive);
                scan_declaration(tw, compressor, left, function() {
                    return node.right;
                }, function(sym, fixed, walk) {
                    if (!(sym instanceof AST_SymbolRef)) {
                        mark_assignment_to_arguments(sym);
                        walk();
                        return;
                    }
                    var d = sym.definition();
                    d.assignments++;
                    if (!fixed || sym.in_arg || !safe_to_assign(tw, d)) {
                        walk();
                        d.fixed = false;
                    } else if (modified) {
                        walk();
                        d.fixed = 0;
                    } else {
                        push_ref(d, sym);
                        mark(tw, d);
                        if (left instanceof AST_Destructured
                            || d.orig.length == 1 && d.orig[0] instanceof AST_SymbolDefun) {
                            d.single_use = false;
                        }
                        tw.loop_ids[d.id] = tw.in_loop;
                        sym.fixed = d.fixed = fixed;
                        sym.fixed.assigns = [ node ];
                        mark_escaped(tw, d, sym.scope, node, right, 0, 1);
                    }
                });
            }