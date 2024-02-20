function getProjectReferenceRedirectProject(fileName) {
                if (!resolvedProjectReferences || !resolvedProjectReferences.length || isDeclarationFileName(fileName) || fileExtensionIs(fileName, ".json" /* Json */)) {
                    return void 0;
                }
                return getResolvedProjectReferenceToRedirect(fileName);
            }