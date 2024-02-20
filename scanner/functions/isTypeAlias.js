function isTypeAlias(node) {
            return isJSDocTypeAlias(node) || isTypeAliasDeclaration(node);
        }