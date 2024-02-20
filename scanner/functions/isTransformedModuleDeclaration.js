function isTransformedModuleDeclaration(node) {
                return getOriginalNode(node).kind === 264 /* ModuleDeclaration */;
            }