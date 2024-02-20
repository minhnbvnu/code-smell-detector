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