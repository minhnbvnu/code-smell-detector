function handle_custom_scan_order(node) {
                    // Skip (non-executed) functions
                    if (node instanceof AST_Scope)
                        return node;
                    // Scan case expressions first in a switch statement
                    if (node instanceof AST_Switch) {
                        node.expression = node.expression.transform(scanner);
                        for (var i = 0, len = node.body.length; !abort && i < len; i++) {
                            var branch = node.body[i];
                            if (branch instanceof AST_Case) {
                                if (!hit) {
                                    if (branch !== hit_stack[hit_index])
                                        continue;
                                    hit_index++;
                                }
                                branch.expression = branch.expression.transform(scanner);
                                if (!replace_all)
                                    break;
                            }
                        }
                        abort = true;
                        return node;
                    }
                }