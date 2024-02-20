function getResolvedProjectReferenceByPath(projectReferencePath) {
                if (!projectReferenceRedirects) {
                    return void 0;
                }
                return projectReferenceRedirects.get(projectReferencePath) || void 0;
            }