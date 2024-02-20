function invalidateResolutions(resolutions, canInvalidate) {
                if (!resolutions)
                    return false;
                let invalidated = false;
                resolutions.forEach((resolution) => {
                    if (resolution.isInvalidated || !canInvalidate(resolution))
                        return;
                    resolution.isInvalidated = invalidated = true;
                    for (const containingFilePath of Debug.checkDefined(resolution.files)) {
                        (filesWithInvalidatedResolutions != null ? filesWithInvalidatedResolutions : filesWithInvalidatedResolutions = /* @__PURE__ */ new Set()).add(containingFilePath);
                        hasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames || endsWith(containingFilePath, inferredTypesContainingFile);
                    }
                });
                return invalidated;
            }