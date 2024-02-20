function convert_ast(fn) {
                return AST_Node.from_mozilla_ast(Object.keys(files).reduce(fn, null));
            }