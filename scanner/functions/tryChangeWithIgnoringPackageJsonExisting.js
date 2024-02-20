function tryChangeWithIgnoringPackageJsonExisting(oldFileName) {
                const newFileName = oldToNew(oldFileName);
                return newFileName && find(sourceFiles, (src) => src.fileName === newFileName) ? tryChangeWithIgnoringPackageJson(oldFileName) : void 0;
            }