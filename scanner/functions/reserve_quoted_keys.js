function reserve_quoted_keys(ast, reserved) {
            function add(name) {
                push_uniq(reserved, name);
            }
            ast.walk(new TreeWalker(function (node) {
                if (node instanceof AST_ObjectKeyVal && node.quote) {
                    add(node.key);
                }
                else if (node instanceof AST_ObjectProperty && node.quote) {
                    add(node.key.name);
                }
                else if (node instanceof AST_Sub) {
                    addStrings(node.property, add);
                }
            }));
        }