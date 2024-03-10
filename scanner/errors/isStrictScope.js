function isStrictScope(scope, block, isMethodDefinition) {
        var _a;
        let body;
        // When upper scope is exists and strict, inner scope is also strict.
        if ((_a = scope.upper) === null || _a === void 0 ? void 0 : _a.isStrict) {
            return true;
        }
        if (isMethodDefinition) {
            return true;
        }
        if (scope.type === ScopeType_1.ScopeType.class ||
            scope.type === ScopeType_1.ScopeType.conditionalType ||
            scope.type === ScopeType_1.ScopeType.functionType ||
            scope.type === ScopeType_1.ScopeType.mappedType ||
            scope.type === ScopeType_1.ScopeType.module ||
            scope.type === ScopeType_1.ScopeType.tsEnum ||
            scope.type === ScopeType_1.ScopeType.tsModule ||
            scope.type === ScopeType_1.ScopeType.type) {
            return true;
        }
        if (scope.type === ScopeType_1.ScopeType.block || scope.type === ScopeType_1.ScopeType.switch) {
            return false;
        }
        if (scope.type === ScopeType_1.ScopeType.function) {
            const functionBody = block;
            switch (functionBody.type) {
                case types_1.AST_NODE_TYPES.ArrowFunctionExpression:
                    if (functionBody.body.type !== types_1.AST_NODE_TYPES.BlockStatement) {
                        return false;
                    }
                    body = functionBody.body;
                    break;
                case types_1.AST_NODE_TYPES.Program:
                    body = functionBody;
                    break;
                default:
                    body = functionBody.body;
            }
            if (!body) {
                return false;
            }
        }
        else if (scope.type === ScopeType_1.ScopeType.global) {
            body = block;
        }
        else {
            return false;
        }
        // Search 'use strict' directive.
        for (const stmt of body.body) {
            if (stmt.type !== types_1.AST_NODE_TYPES.ExpressionStatement) {
                break;
            }
            if (stmt.directive === 'use strict') {
                return true;
            }
            const expr = stmt.expression;
            if (expr.type !== types_1.AST_NODE_TYPES.Literal) {
                break;
            }
            if (expr.raw === '"use strict"' || expr.raw === "'use strict'") {
                return true;
            }
            if (expr.value === 'use strict') {
                return true;
            }
        }
        return false;
    }