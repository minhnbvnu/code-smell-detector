function isAllowedEmptyConstructor(node) {
                const parent = node.parent;
                if (isBodyEmpty(node) &&
                    (parent === null || parent === void 0 ? void 0 : parent.type) === utils_1.AST_NODE_TYPES.MethodDefinition &&
                    parent.kind === 'constructor') {
                    const { accessibility } = parent;
                    return (
                    // allow protected constructors
                    (accessibility === 'protected' && isAllowedProtectedConstructors) ||
                        // allow private constructors
                        (accessibility === 'private' && isAllowedPrivateConstructors) ||
                        // allow constructors which have parameter properties
                        hasParameterProperties(node));
                }
                return false;
            }