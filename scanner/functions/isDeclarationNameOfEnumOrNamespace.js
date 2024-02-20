function isDeclarationNameOfEnumOrNamespace(node) {
            const parseNode = getParseTreeNode(node);
            if (parseNode) {
                switch (parseNode.parent.kind) {
                    case 263 /* EnumDeclaration */:
                    case 264 /* ModuleDeclaration */:
                        return parseNode === parseNode.parent.name;
                }
            }
            return false;
        }