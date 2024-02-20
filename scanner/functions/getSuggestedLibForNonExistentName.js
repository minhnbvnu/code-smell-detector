function getSuggestedLibForNonExistentName(name) {
                const missingName = diagnosticName(name);
                const allFeatures = getScriptTargetFeatures();
                const typeFeatures = allFeatures.get(missingName);
                return typeFeatures && firstIterator(typeFeatures.keys());
            }