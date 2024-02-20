function createDefinitionFromSignatureDeclaration(typeChecker, decl, failedAliasResolution) {
            return createDefinitionInfo(decl, typeChecker, decl.symbol, decl, 
            /*unverified*/
            false, failedAliasResolution);
        }