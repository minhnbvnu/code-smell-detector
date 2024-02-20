function resolveEntityNameFromAssignmentDeclaration(name, meaning) {
                if (isJSDocTypeReference(name.parent)) {
                    const secondaryLocation = getAssignmentDeclarationLocation(name.parent);
                    if (secondaryLocation) {
                        return resolveName(secondaryLocation, name.escapedText, meaning, 
                        /*nameNotFoundMessage*/
                        void 0, name, 
                        /*isUse*/
                        true);
                    }
                }
            }