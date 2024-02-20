function isExported(node, name, scope) {
        var _a, _b;
        if (((_a = node === null || node === void 0 ? void 0 : node.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.ExportDefaultDeclaration ||
            ((_b = node === null || node === void 0 ? void 0 : node.parent) === null || _b === void 0 ? void 0 : _b.type) === utils_1.AST_NODE_TYPES.ExportNamedDeclaration) {
            return true;
        }
        if (scope == null) {
            return false;
        }
        const variable = scope.set.get(name);
        if (variable) {
            for (const ref of variable.references) {
                const refParent = ref.identifier.parent;
                if ((refParent === null || refParent === void 0 ? void 0 : refParent.type) === utils_1.AST_NODE_TYPES.ExportDefaultDeclaration ||
                    (refParent === null || refParent === void 0 ? void 0 : refParent.type) === utils_1.AST_NODE_TYPES.ExportSpecifier) {
                    return true;
                }
            }
        }
        return false;
    }