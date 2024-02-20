function invalidateResolutionOfFile(filePath) {
                removeResolutionsOfFile(filePath);
                const prevHasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames;
                if (invalidateResolutions(resolvedFileToResolution.get(filePath), returnTrue) && hasChangedAutomaticTypeDirectiveNames && !prevHasChangedAutomaticTypeDirectiveNames) {
                    resolutionHost.onChangedAutomaticTypeDirectiveNames();
                }
            }