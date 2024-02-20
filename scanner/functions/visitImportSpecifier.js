function visitImportSpecifier(node) {
                return !node.isTypeOnly && shouldEmitAliasDeclaration(node) ? node : void 0;
            }