function find_variable(compressor, name) {
            var scope, i = 0;
            while (scope = compressor.parent(i++)) {
                if (scope instanceof AST_Scope)
                    break;
                if (scope instanceof AST_Catch && scope.argname) {
                    scope = scope.argname.definition().scope;
                    break;
                }
            }
            return scope.find_variable(name);
        }