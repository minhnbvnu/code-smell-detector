function isSourceOfProjectReferenceRedirect(fileName) {
                return useSourceOfProjectReferenceRedirect && !!getResolvedProjectReferenceToRedirect(fileName);
            }