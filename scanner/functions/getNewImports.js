function getNewImports(moduleSpecifier, quotePreference, defaultImport, namedImports, namespaceLikeImport, compilerOptions) {
            const quotedModuleSpecifier = makeStringLiteral(moduleSpecifier, quotePreference);
            let statements;
            if (defaultImport !== void 0 || (namedImports == null ? void 0 : namedImports.length)) {
                const topLevelTypeOnly = (!defaultImport || needsTypeOnly(defaultImport)) && every(namedImports, needsTypeOnly) || compilerOptions.verbatimModuleSyntax && (defaultImport == null ? void 0 : defaultImport.addAsTypeOnly) !== 4 /* NotAllowed */ && !some(namedImports, (i) => i.addAsTypeOnly === 4 /* NotAllowed */);
                statements = combine(statements, makeImport(defaultImport && factory.createIdentifier(defaultImport.name), namedImports == null ? void 0 : namedImports.map(({ addAsTypeOnly, name }) => factory.createImportSpecifier(!topLevelTypeOnly && addAsTypeOnly === 2 /* Required */, 
                /*propertyName*/
                void 0, factory.createIdentifier(name))), moduleSpecifier, quotePreference, topLevelTypeOnly));
            }
            if (namespaceLikeImport) {
                const declaration = namespaceLikeImport.importKind === 3 /* CommonJS */ ? factory.createImportEqualsDeclaration(
                /*modifiers*/
                void 0, needsTypeOnly(namespaceLikeImport), factory.createIdentifier(namespaceLikeImport.name), factory.createExternalModuleReference(quotedModuleSpecifier)) : factory.createImportDeclaration(
                /*modifiers*/
                void 0, factory.createImportClause(needsTypeOnly(namespaceLikeImport), 
                /*name*/
                void 0, factory.createNamespaceImport(factory.createIdentifier(namespaceLikeImport.name))), quotedModuleSpecifier, 
                /*assertClause*/
                void 0);
                statements = combine(statements, declaration);
            }
            return Debug.checkDefined(statements);
        }