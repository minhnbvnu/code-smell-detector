function isEnclosingDeclaration(node) {
                return isSourceFile(node) || isTypeAliasDeclaration(node) || isModuleDeclaration(node) || isClassDeclaration(node) || isInterfaceDeclaration(node) || isFunctionLike(node) || isIndexSignatureDeclaration(node) || isMappedTypeNode(node);
            }