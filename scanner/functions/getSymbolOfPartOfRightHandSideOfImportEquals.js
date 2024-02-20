function getSymbolOfPartOfRightHandSideOfImportEquals(entityName, dontResolveAlias) {
                if (entityName.kind === 79 /* Identifier */ && isRightSideOfQualifiedNameOrPropertyAccess(entityName)) {
                    entityName = entityName.parent;
                }
                if (entityName.kind === 79 /* Identifier */ || entityName.parent.kind === 163 /* QualifiedName */) {
                    return resolveEntityName(entityName, 1920 /* Namespace */, 
                    /*ignoreErrors*/
                    false, dontResolveAlias);
                }
                else {
                    Debug.assert(entityName.parent.kind === 268 /* ImportEqualsDeclaration */);
                    return resolveEntityName(entityName, 111551 /* Value */ | 788968 /* Type */ | 1920 /* Namespace */, 
                    /*ignoreErrors*/
                    false, dontResolveAlias);
                }
            }