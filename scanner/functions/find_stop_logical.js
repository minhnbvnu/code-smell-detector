function find_stop_logical(parent, op, level) {
                var node;
                do {
                    node = parent;
                    parent = scanner.parent(++level);
                } while (parent instanceof AST_Assign && parent.operator.slice(0, -1) == op
                    || parent instanceof AST_Binary && parent.operator == op);
                return node;
            }