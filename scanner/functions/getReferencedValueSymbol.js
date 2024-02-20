function getReferencedValueSymbol(reference, startInDeclarationContainer) {
                const resolvedSymbol = getNodeLinks(reference).resolvedSymbol;
                if (resolvedSymbol) {
                    return resolvedSymbol;
                }
                let location = reference;
                if (startInDeclarationContainer) {
                    const parent2 = reference.parent;
                    if (isDeclaration(parent2) && reference === parent2.name) {
                        location = getDeclarationContainer(parent2);
                    }
                }
                return resolveName(location, reference.escapedText, 111551 /* Value */ | 1048576 /* ExportValue */ | 2097152 /* Alias */, 
                /*nodeNotFoundMessage*/
                void 0, 
                /*nameArg*/
                void 0, 
                /*isUse*/
                true);
            }