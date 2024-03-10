function mark_duplicate_condition(compressor, node) {
        var child;
        var level = 0;
        var negated = false;
        var parent = compressor.self();
        if (!is_statement(parent)) while (true) {
            child = parent;
            parent = compressor.parent(level++);
            if (parent instanceof AST_Binary) {
                var op = parent.operator;
                if (!lazy_op[op]) return;
                var left = parent.left;
                if (left === child) continue;
                if (match(left)) switch (op) {
                  case "&&":
                    node[negated ? "falsy" : "truthy"] = true;
                    break;
                  case "||":
                  case "??":
                    node[negated ? "truthy" : "falsy"] = true;
                    break;
                }
            } else if (parent instanceof AST_Conditional) {
                var cond = parent.condition;
                if (cond === child) continue;
                if (match(cond)) switch (child) {
                  case parent.consequent:
                    node[negated ? "falsy" : "truthy"] = true;
                    break;
                  case parent.alternative:
                    node[negated ? "truthy" : "falsy"] = true;
                    break;
                }
            } else if (parent instanceof AST_Exit) {
                break;
            } else if (parent instanceof AST_If) {
                break;
            } else if (parent instanceof AST_Sequence) {
                if (parent.expressions[0] === child) continue;
            } else if (parent instanceof AST_SimpleStatement) {
                break;
            }
            return;
        }
        while (true) {
            child = parent;
            parent = compressor.parent(level++);
            if (parent instanceof AST_BlockStatement) {
                if (parent.body[0] === child) continue;
            } else if (parent instanceof AST_If) {
                if (match(parent.condition)) switch (child) {
                  case parent.body:
                    node[negated ? "falsy" : "truthy"] = true;
                    break;
                  case parent.alternative:
                    node[negated ? "truthy" : "falsy"] = true;
                    break;
                }
            }
            return;
        }

        function match(cond) {
            if (node.equivalent_to(cond)) return true;
            if (!(cond instanceof AST_UnaryPrefix)) return false;
            if (cond.operator != "!") return false;
            if (!node.equivalent_to(cond.expression)) return false;
            negated = true;
            return true;
        }
    }