function isInitPatternNode(variable, shadowedVariable) {
                var _a, _b, _c, _d;
                const outerDef = shadowedVariable.defs[0];
                if (!outerDef) {
                    return false;
                }
                const { variableScope } = variable.scope;
                if (!((variableScope.block.type ===
                    utils_1.AST_NODE_TYPES.ArrowFunctionExpression ||
                    variableScope.block.type === utils_1.AST_NODE_TYPES.FunctionExpression) &&
                    getOuterScope(variableScope) === shadowedVariable.scope)) {
                    return false;
                }
                const fun = variableScope.block;
                const { parent } = fun;
                const callExpression = findSelfOrAncestor(parent, node => node.type === utils_1.AST_NODE_TYPES.CallExpression);
                if (!callExpression) {
                    return false;
                }
                let node = outerDef.name;
                const location = callExpression.range[1];
                while (node) {
                    if (node.type === utils_1.AST_NODE_TYPES.VariableDeclarator) {
                        if (isInRange(node.init, location)) {
                            return true;
                        }
                        if ((((_b = (_a = node.parent) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.type) === utils_1.AST_NODE_TYPES.ForInStatement ||
                            ((_d = (_c = node.parent) === null || _c === void 0 ? void 0 : _c.parent) === null || _d === void 0 ? void 0 : _d.type) === utils_1.AST_NODE_TYPES.ForOfStatement) &&
                            isInRange(node.parent.parent.right, location)) {
                            return true;
                        }
                        break;
                    }
                    else if (node.type === utils_1.AST_NODE_TYPES.AssignmentPattern) {
                        if (isInRange(node.right, location)) {
                            return true;
                        }
                    }
                    else if ([
                        utils_1.AST_NODE_TYPES.FunctionDeclaration,
                        utils_1.AST_NODE_TYPES.ClassDeclaration,
                        utils_1.AST_NODE_TYPES.FunctionExpression,
                        utils_1.AST_NODE_TYPES.ClassExpression,
                        utils_1.AST_NODE_TYPES.ArrowFunctionExpression,
                        utils_1.AST_NODE_TYPES.CatchClause,
                        utils_1.AST_NODE_TYPES.ImportDeclaration,
                        utils_1.AST_NODE_TYPES.ExportNamedDeclaration,
                    ].includes(node.type)) {
                        break;
                    }
                    node = node.parent;
                }
                return false;
            }