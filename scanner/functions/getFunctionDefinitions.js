function getFunctionDefinitions(variable) {
            const functionDefinitions = new Set();
            variable.defs.forEach(def => {
                var _a, _b;
                // FunctionDeclarations
                if (def.type === utils_1.TSESLint.Scope.DefinitionType.FunctionName) {
                    functionDefinitions.add(def.node);
                }
                // FunctionExpressions
                if (def.type === utils_1.TSESLint.Scope.DefinitionType.Variable &&
                    (((_a = def.node.init) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.FunctionExpression ||
                        ((_b = def.node.init) === null || _b === void 0 ? void 0 : _b.type) === utils_1.AST_NODE_TYPES.ArrowFunctionExpression)) {
                    functionDefinitions.add(def.node.init);
                }
            });
            return functionDefinitions;
        }