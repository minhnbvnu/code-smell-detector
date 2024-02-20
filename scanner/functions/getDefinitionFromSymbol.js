function getDefinitionFromSymbol(typeChecker, symbol, node, failedAliasResolution, excludeDeclaration) {
            const filteredDeclarations = filter(symbol.declarations, (d) => d !== excludeDeclaration);
            const withoutExpandos = filter(filteredDeclarations, (d) => !isExpandoDeclaration(d));
            const results = some(withoutExpandos) ? withoutExpandos : filteredDeclarations;
            return getConstructSignatureDefinition() || getCallSignatureDefinition() || map(results, (declaration) => createDefinitionInfo(declaration, typeChecker, symbol, node, 
            /*unverified*/
            false, failedAliasResolution));
            function getConstructSignatureDefinition() {
                if (symbol.flags & 32 /* Class */ && !(symbol.flags & (16 /* Function */ | 3 /* Variable */)) && (isNewExpressionTarget(node) || node.kind === 135 /* ConstructorKeyword */)) {
                    const cls = find(filteredDeclarations, isClassLike) || Debug.fail("Expected declaration to have at least one class-like declaration");
                    return getSignatureDefinition(cls.members, 
                    /*selectConstructors*/
                    true);
                }
            }
            function getCallSignatureDefinition() {
                return isCallOrNewExpressionTarget(node) || isNameOfFunctionDeclaration(node) ? getSignatureDefinition(filteredDeclarations, 
                /*selectConstructors*/
                false) : void 0;
            }
            function getSignatureDefinition(signatureDeclarations, selectConstructors) {
                if (!signatureDeclarations) {
                    return void 0;
                }
                const declarations = signatureDeclarations.filter(selectConstructors ? isConstructorDeclaration : isFunctionLike);
                const declarationsWithBody = declarations.filter((d) => !!d.body);
                return declarations.length ? declarationsWithBody.length !== 0 ? declarationsWithBody.map((x) => createDefinitionInfo(x, typeChecker, symbol, node)) : [createDefinitionInfo(last(declarations), typeChecker, symbol, node, 
                    /*unverified*/
                    false, failedAliasResolution)] : void 0;
            }
        }