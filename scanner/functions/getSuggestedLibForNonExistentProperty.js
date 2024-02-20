function getSuggestedLibForNonExistentProperty(missingProperty, containingType) {
                const container = getApparentType(containingType).symbol;
                if (!container) {
                    return void 0;
                }
                const containingTypeName = symbolName(container);
                const allFeatures = getScriptTargetFeatures();
                const typeFeatures = allFeatures.get(containingTypeName);
                if (typeFeatures) {
                    for (const [libTarget, featuresOfType] of typeFeatures) {
                        if (contains(featuresOfType, missingProperty)) {
                            return libTarget;
                        }
                    }
                }
            }