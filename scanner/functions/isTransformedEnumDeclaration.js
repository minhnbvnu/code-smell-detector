function isTransformedEnumDeclaration(node) {
                return getOriginalNode(node).kind === 263 /* EnumDeclaration */;
            }