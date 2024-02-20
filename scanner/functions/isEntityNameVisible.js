function isEntityNameVisible(entityName, enclosingDeclaration) {
                let meaning;
                if (entityName.parent.kind === 183 /* TypeQuery */ || entityName.parent.kind === 230 /* ExpressionWithTypeArguments */ && !isPartOfTypeNode(entityName.parent) || entityName.parent.kind === 164 /* ComputedPropertyName */) {
                    meaning = 111551 /* Value */ | 1048576 /* ExportValue */;
                }
                else if (entityName.kind === 163 /* QualifiedName */ || entityName.kind === 208 /* PropertyAccessExpression */ || entityName.parent.kind === 268 /* ImportEqualsDeclaration */) {
                    meaning = 1920 /* Namespace */;
                }
                else {
                    meaning = 788968 /* Type */;
                }
                const firstIdentifier = getFirstIdentifier(entityName);
                const symbol = resolveName(enclosingDeclaration, firstIdentifier.escapedText, meaning, 
                /*nodeNotFoundErrorMessage*/
                void 0, 
                /*nameArg*/
                void 0, 
                /*isUse*/
                false);
                if (symbol && symbol.flags & 262144 /* TypeParameter */ && meaning & 788968 /* Type */) {
                    return { accessibility: 0 /* Accessible */ };
                }
                if (!symbol && isThisIdentifier(firstIdentifier) && isSymbolAccessible(getSymbolOfDeclaration(getThisContainer(firstIdentifier, 
                /*includeArrowFunctions*/
                false, 
                /*includeClassComputedPropertyName*/
                false)), firstIdentifier, meaning, 
                /*computeAliases*/
                false).accessibility === 0 /* Accessible */) {
                    return { accessibility: 0 /* Accessible */ };
                }
                return symbol && hasVisibleDeclarations(symbol, 
                /*shouldComputeAliasToMakeVisible*/
                true) || {
                    accessibility: 1 /* NotAccessible */,
                    errorSymbolName: getTextOfNode(firstIdentifier),
                    errorNode: firstIdentifier
                };
            }