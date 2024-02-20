function tryUpdateString(element) {
                if (!isStringLiteral(element))
                    return false;
                const elementFileName = combinePathsSafe(configDir, element.text);
                const updated = oldToNew(elementFileName);
                if (updated !== void 0) {
                    changeTracker.replaceRangeWithText(configFile, createStringRange(element, configFile), relativePath(updated));
                    return true;
                }
                return false;
            }