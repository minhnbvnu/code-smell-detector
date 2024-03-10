            ast.walk(new TreeWalker(function (node) {
                if (node instanceof AST_ClassPrivateProperty
                    || node instanceof AST_PrivateMethod
                    || node instanceof AST_PrivateGetter
                    || node instanceof AST_PrivateSetter
                    || node instanceof AST_DotHash)
                    ;
                else if (node instanceof AST_ObjectKeyVal) {
                    if (typeof node.key == "string" && (!keep_quoted || !node.quote)) {
                        add(node.key);
                    }
                }
                else if (node instanceof AST_ObjectProperty) {
                    // setter or getter, since KeyVal is handled above
                    if (!keep_quoted || !node.quote) {
                        add(node.key.name);
                    }
                }
                else if (node instanceof AST_Dot) {
                    var declared = !!options.undeclared;
                    if (!declared) {
                        var root = node;
                        while (root.expression) {
                            root = root.expression;
                        }
                        declared = !(root.thedef && root.thedef.undeclared);
                    }
                    if (declared &&
                        (!keep_quoted || !node.quote)) {
                        add(node.property);
                    }
                }
                else if (node instanceof AST_Sub) {
                    if (!keep_quoted) {
                        addStrings(node.property, add);
                    }
                }
                else if (node instanceof AST_Call
                    && node.expression.print_to_string() == "Object.defineProperty") {
                    addStrings(node.args[1], add);
                }
                else if (node instanceof AST_Binary && node.operator === "in") {
                    addStrings(node.left, add);
                }
            }));
            return ast.transform(new TreeTransformer(function (node) {
                if (node instanceof AST_ClassPrivateProperty
                    || node instanceof AST_PrivateMethod
                    || node instanceof AST_PrivateGetter
                    || node instanceof AST_PrivateSetter
                    || node instanceof AST_DotHash)
                    ;
                else if (node instanceof AST_ObjectKeyVal) {
                    if (typeof node.key == "string" && (!keep_quoted || !node.quote)) {
                        node.key = mangle(node.key);
                    }
                }
                else if (node instanceof AST_ObjectProperty) {
                    // setter, getter, method or class field
                    if (!keep_quoted || !node.quote) {
                        node.key.name = mangle(node.key.name);
                    }
                }
                else if (node instanceof AST_Dot) {
                    if (!keep_quoted || !node.quote) {
                        node.property = mangle(node.property);
                    }
                }
                else if (!keep_quoted && node instanceof AST_Sub) {
                    node.property = mangleStrings(node.property);
                }
                else if (node instanceof AST_Call
                    && node.expression.print_to_string() == "Object.defineProperty") {
                    node.args[1] = mangleStrings(node.args[1]);
                }
                else if (node instanceof AST_Binary && node.operator === "in") {
                    node.left = mangleStrings(node.left);
                }
            }));