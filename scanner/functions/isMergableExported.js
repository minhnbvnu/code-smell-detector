function isMergableExported(variable) {
        var _a, _b;
        // If all of the merged things are of the same type, TS will error if not all of them are exported - so we only need to find one
        for (const def of variable.defs) {
            // parameters can never be exported.
            // their `node` prop points to the function decl, which can be exported
            // so we need to special case them
            if (def.type === utils_1.TSESLint.Scope.DefinitionType.Parameter) {
                continue;
            }
            if ((MERGABLE_TYPES.has(def.node.type) &&
                ((_a = def.node.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.ExportNamedDeclaration) ||
                ((_b = def.node.parent) === null || _b === void 0 ? void 0 : _b.type) === utils_1.AST_NODE_TYPES.ExportDefaultDeclaration) {
                return true;
            }
        }
        return false;
    }