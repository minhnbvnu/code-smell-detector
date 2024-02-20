function convertVariableStatement(sourceFile, statement, changes, checker, identifiers, target, quotePreference) {
            const { declarationList } = statement;
            let foundImport = false;
            const converted = map(declarationList.declarations, (decl) => {
                const { name, initializer } = decl;
                if (initializer) {
                    if (isExportsOrModuleExportsOrAlias(sourceFile, initializer)) {
                        foundImport = true;
                        return convertedImports([]);
                    }
                    else if (isRequireCall(initializer, 
                    /*checkArgumentIsStringLiteralLike*/
                    true)) {
                        foundImport = true;
                        return convertSingleImport(name, initializer.arguments[0], checker, identifiers, target, quotePreference);
                    }
                    else if (isPropertyAccessExpression(initializer) && isRequireCall(initializer.expression, 
                    /*checkArgumentIsStringLiteralLike*/
                    true)) {
                        foundImport = true;
                        return convertPropertyAccessImport(name, initializer.name.text, initializer.expression.arguments[0], identifiers, quotePreference);
                    }
                }
                return convertedImports([factory.createVariableStatement(
                    /*modifiers*/
                    void 0, factory.createVariableDeclarationList([decl], declarationList.flags))]);
            });
            if (foundImport) {
                changes.replaceNodeWithNodes(sourceFile, statement, flatMap(converted, (c) => c.newImports));
                let combinedUseSites;
                forEach(converted, (c) => {
                    if (c.useSitesToUnqualify) {
                        copyEntries(c.useSitesToUnqualify, combinedUseSites != null ? combinedUseSites : combinedUseSites = /* @__PURE__ */ new Map());
                    }
                });
                return combinedUseSites;
            }
        }