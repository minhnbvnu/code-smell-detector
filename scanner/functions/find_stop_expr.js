function find_stop_expr(expr, cont, node, parent, level) {
                var replace = can_replace;
                can_replace = false;
                var after = stop_after;
                var if_hit = stop_if_hit;
                var stack = scanner.stack;
                scanner.stack = [ parent ];
                expr.transform(scanner);
                scanner.stack = stack;
                stop_if_hit = if_hit;
                stop_after = after;
                can_replace = replace;
                if (abort) {
                    abort = false;
                    return node;
                }
                return cont(parent, level + 1);
            }