function shouldPrintWithInitializer(node) {
                return canHaveLiteralInitializer(node) && resolver.isLiteralConstDeclaration(getParseTreeNode(node));
            }