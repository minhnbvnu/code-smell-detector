function getTargetOfImportSpecifier(node, dontResolveAlias) {
                if (isImportSpecifier(node) && idText(node.propertyName || node.name) === "default" /* Default */) {
                    const specifier = getModuleSpecifierForImportOrExport(node);
                    const moduleSymbol = specifier && resolveExternalModuleName(node, specifier);
                    if (moduleSymbol) {
                        return getTargetofModuleDefault(moduleSymbol, node, dontResolveAlias);
                    }
                }
                const root = isBindingElement(node) ? getRootDeclaration(node) : node.parent.parent.parent;
                const commonJSPropertyAccess = getCommonJSPropertyAccess(root);
                const resolved = getExternalModuleMember(root, commonJSPropertyAccess || node, dontResolveAlias);
                const name = node.propertyName || node.name;
                if (commonJSPropertyAccess && resolved && isIdentifier(name)) {
                    return resolveSymbol(getPropertyOfType(getTypeOfSymbol(resolved), name.escapedText), dontResolveAlias);
                }
                markSymbolOfAliasDeclarationIfTypeOnly(node, 
                /*immediateTarget*/
                void 0, resolved, 
                /*overwriteEmpty*/
                false);
                return resolved;
            }