function mangle_private_properties(ast, options) {
            var cprivate = -1;
            var private_cache = new Map();
            var nth_identifier = options.nth_identifier || base54;
            ast = ast.transform(new TreeTransformer(function (node) {
                if (node instanceof AST_ClassPrivateProperty
                    || node instanceof AST_PrivateMethod
                    || node instanceof AST_PrivateGetter
                    || node instanceof AST_PrivateSetter
                    || node instanceof AST_PrivateIn) {
                    node.key.name = mangle_private(node.key.name);
                }
                else if (node instanceof AST_DotHash) {
                    node.property = mangle_private(node.property);
                }
            }));
            return ast;
            function mangle_private(name) {
                let mangled = private_cache.get(name);
                if (!mangled) {
                    mangled = nth_identifier.get(++cprivate);
                    private_cache.set(name, mangled);
                }
                return mangled;
            }
        }