function getTargetOfImportEqualsDeclaration(node, dontResolveAlias) {
                const commonJSPropertyAccess = getCommonJSPropertyAccess(node);
                if (commonJSPropertyAccess) {
                    const name = getLeftmostAccessExpression(commonJSPropertyAccess.expression).arguments[0];
                    return isIdentifier(commonJSPropertyAccess.name) ? resolveSymbol(getPropertyOfType(resolveExternalModuleTypeByLiteral(name), commonJSPropertyAccess.name.escapedText)) : void 0;
                }
                if (isVariableDeclaration(node) || node.moduleReference.kind === 280 /* ExternalModuleReference */) {
                    const immediate = resolveExternalModuleName(node, getExternalModuleRequireArgument(node) || getExternalModuleImportEqualsDeclarationExpression(node));
                    const resolved2 = resolveExternalModuleSymbol(immediate);
                    markSymbolOfAliasDeclarationIfTypeOnly(node, immediate, resolved2, 
                    /*overwriteEmpty*/
                    false);
                    return resolved2;
                }
                const resolved = getSymbolOfPartOfRightHandSideOfImportEquals(node.moduleReference, dontResolveAlias);
                checkAndReportErrorForResolvingImportAliasToTypeOnlySymbol(node, resolved);
                return resolved;
            }