function isOnInitializer(variable, scopeVar) {
                var _a;
                const outerScope = scopeVar.scope;
                const outerDef = scopeVar.defs[0];
                const outer = (_a = outerDef === null || outerDef === void 0 ? void 0 : outerDef.parent) === null || _a === void 0 ? void 0 : _a.range;
                const innerScope = variable.scope;
                const innerDef = variable.defs[0];
                const inner = innerDef === null || innerDef === void 0 ? void 0 : innerDef.name.range;
                return !!(outer &&
                    inner &&
                    outer[0] < inner[0] &&
                    inner[1] < outer[1] &&
                    ((innerDef.type === scope_manager_1.DefinitionType.FunctionName &&
                        innerDef.node.type === utils_1.AST_NODE_TYPES.FunctionExpression) ||
                        innerDef.node.type === utils_1.AST_NODE_TYPES.ClassExpression) &&
                    outerScope === innerScope.upper);
            }