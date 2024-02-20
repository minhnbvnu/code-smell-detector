function transformSourceFile(node) {
                if (node.isDeclarationFile) {
                    return node;
                }
                currentSourceFile = node;
                const result = getModuleTransformForFile(node)(node);
                currentSourceFile = void 0;
                Debug.assert(isSourceFile(result));
                return result;
            }