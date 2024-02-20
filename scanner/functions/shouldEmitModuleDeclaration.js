function shouldEmitModuleDeclaration(nodeIn) {
                const node = getParseTreeNode(nodeIn, isModuleDeclaration);
                if (!node) {
                    return true;
                }
                return isInstantiatedModule(node, shouldPreserveConstEnums(compilerOptions));
            }