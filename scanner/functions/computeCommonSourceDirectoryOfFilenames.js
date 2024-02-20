function computeCommonSourceDirectoryOfFilenames(fileNames, currentDirectory, getCanonicalFileName) {
            let commonPathComponents;
            const failed = forEach(fileNames, (sourceFile) => {
                const sourcePathComponents = getNormalizedPathComponents(sourceFile, currentDirectory);
                sourcePathComponents.pop();
                if (!commonPathComponents) {
                    commonPathComponents = sourcePathComponents;
                    return;
                }
                const n = Math.min(commonPathComponents.length, sourcePathComponents.length);
                for (let i = 0; i < n; i++) {
                    if (getCanonicalFileName(commonPathComponents[i]) !== getCanonicalFileName(sourcePathComponents[i])) {
                        if (i === 0) {
                            return true;
                        }
                        commonPathComponents.length = i;
                        break;
                    }
                }
                if (sourcePathComponents.length < commonPathComponents.length) {
                    commonPathComponents.length = sourcePathComponents.length;
                }
            });
            if (failed) {
                return "";
            }
            if (!commonPathComponents) {
                return currentDirectory;
            }
            return getPathFromPathComponents(commonPathComponents);
        }